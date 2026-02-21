"""
BASSC 速滑俱乐部 - API 视图
公开 GET 仅返回 is_active=True；POST/PUT/PATCH/DELETE 仅超级用户/管理员。
"""
from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import HomePagePic, Board, Introduction, News, NavItem, Course
from .permissions import IsAdminUserOrReadOnly
from .serializers import (
    HomePagePicSerializer,
    BoardSerializer,
    IntroductionSerializer,
    NewsSerializer,
    NavItemSerializer,
    CourseSerializer,
)
from .storage_backend import upload_file_to_bucket
from .utils import get_image_url_for_api


def _filter_active(queryset, request):
    """非管理员仅返回 is_active=True 的记录"""
    if request.user and request.user.is_authenticated and request.user.is_staff:
        return queryset
    return queryset.filter(is_active=True)


class HomePagePicViewSet(viewsets.ModelViewSet):
    queryset = HomePagePic.objects.all()
    serializer_class = HomePagePicSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        return _filter_active(HomePagePic.objects.all(), self.request)


class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        return _filter_active(Board.objects.all(), self.request)


class IntroductionViewSet(viewsets.ModelViewSet):
    queryset = Introduction.objects.all()
    serializer_class = IntroductionSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        return _filter_active(Introduction.objects.all(), self.request)


class NewsViewSet(viewsets.ModelViewSet):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        return _filter_active(News.objects.all(), self.request)


class NavItemViewSet(viewsets.ModelViewSet):
    queryset = NavItem.objects.all()
    serializer_class = NavItemSerializer
    permission_classes = [IsAdminUserOrReadOnly]

    def get_queryset(self):
        return _filter_active(NavItem.objects.all(), self.request)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAdminUserOrReadOnly]
    lookup_field = 'id'
    lookup_url_kwarg = 'id'

    def get_queryset(self):
        return _filter_active(Course.objects.all(), self.request)


@api_view(['GET'])
@permission_classes([AllowAny])
def course_by_slug(request, slug):
    """公开：按 slug 获取单门课程（仅 is_active=True，或 staff 可见全部）"""
    from django.shortcuts import get_object_or_404
    course = get_object_or_404(Course, slug=slug)
    if not (request.user and request.user.is_authenticated and request.user.is_staff) and not course.is_active:
        return Response(status=404)
    serializer = CourseSerializer(course)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """API 健康检查"""
    return Response({'status': 'ok', 'message': 'BASSC 速滑俱乐部 API 运行正常'})


@api_view(['GET'])
@permission_classes([AllowAny])
def homepage(request):
    """
    一次性返回全部主页素材（仅 is_active=True），供前端直接展示。
    返回字段与前端约定一致：homePagePic, boards, introductions, news, navItems。
    """
    pics = HomePagePic.objects.filter(is_active=True).order_by('sort_order')
    boards_qs = Board.objects.filter(is_active=True).order_by('sort_order')
    intros_qs = Introduction.objects.filter(is_active=True).order_by('sort_order')
    news_qs = News.objects.filter(is_active=True).order_by('sort_order', '-created_at')[:20]
    nav_qs = NavItem.objects.filter(is_active=True).order_by('sort_order')

    # 轮播图：有存储就展示存储的；无图时用默认占位
    home_page_pic = [
        {'id': p.id, 'image': get_image_url_for_api(p.image), 'title': p.title, 'description': p.description}
        for p in pics
    ]
    # board：无素材时用 default
    boards_list = [
        {'id': b.id, 'image': get_image_url_for_api(b.image), 'title': b.title, 'description': b.description, 'link': b.link or ''}
        for b in boards_qs
    ]
    # introductions：无图用 default
    introductions_list = [
        {'id': i.id, 'image': get_image_url_for_api(i.image), 'title': i.title, 'text': i.text}
        for i in intros_qs
    ]
    # news：无主图/无配图时用 default
    news_list = []
    for n in news_qs:
        images = [
            get_image_url_for_api(img.image_url)
            for img in n.images.filter(is_active=True).order_by('sort_order')
        ]
        if not images:
            images = [get_image_url_for_api(None)]  # 无配图时给一个默认图
        news_list.append({
            'id': n.id,
            'primPic': get_image_url_for_api(n.prim_pic),
            'images': images,
            'title': n.title,
            'intro': n.intro,
            'content': n.content,
        })
    nav_items = [
        {'id': n.key, 'label': n.label, 'path': n.path}
        for n in nav_qs
    ]

    return Response({
        'homePagePic': home_page_pic,
        'boards': boards_list,
        'introductions': introductions_list,
        'news': news_list,
        'navItems': nav_items,
    })


# ---------- 认证（Dashboard 登录，Token 方式，无 CSRF） ----------

@api_view(['POST'])
@permission_classes([AllowAny])
def auth_login(request):
    """登录：username, password -> 返回 token，前端请求头带 Authorization: Token <token>"""
    username = request.data.get('username') or request.POST.get('username')
    password = request.data.get('password') or request.POST.get('password')
    if not username or not password:
        return Response({'error': '需要 username 和 password'}, status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(request, username=username, password=password)
    if user is None:
        return Response({'error': '用户名或密码错误'}, status=status.HTTP_401_UNAUTHORIZED)
    if not user.is_superuser and not user.is_staff:
        return Response({'error': '仅超级用户或管理员可登录'}, status=status.HTTP_403_FORBIDDEN)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key,
        'user': {'id': user.id, 'username': user.username, 'is_superuser': user.is_superuser, 'is_staff': user.is_staff},
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def auth_logout(request):
    """登出：可选删除当前 token（强制下次重新登录）"""
    if hasattr(request, 'auth') and request.auth and getattr(request.auth, 'delete', None):
        request.auth.delete()
    return Response({'detail': 'ok'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def auth_me(request):
    """当前用户，用于判断是否为 superuser 以展示 Dashboard"""
    u = request.user
    return Response({
        'user': {'id': u.id, 'username': u.username, 'is_superuser': u.is_superuser, 'is_staff': u.is_staff},
    })


# ---------- 图片/视频上传（Railway Bucket） ----------

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_image(request):
    """上传图片或短视频到 Railway Bucket，仅 staff。body: multipart 字段 image 或 file。视频存到 videos/，图片存到 uploads/。"""
    if not request.user.is_staff:
        return Response({'error': '需要管理员权限'}, status=status.HTTP_403_FORBIDDEN)
    file_obj = request.FILES.get('image') or request.FILES.get('file')
    if not file_obj:
        return Response({'error': '请上传 image 或 file 字段'}, status=status.HTTP_400_BAD_REQUEST)
    content_type = getattr(file_obj, 'content_type', '') or ''
    folder = 'videos' if content_type.startswith('video/') else 'uploads'
    url = upload_file_to_bucket(file_obj, folder=folder)
    if not url:
        return Response({'error': '上传失败或未配置 Bucket'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({'url': url})
