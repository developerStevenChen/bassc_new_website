"""
BASSC 速滑俱乐部 - 数据库模型
与前端数据结构对应，图片存链接，所有内容模型均有 is_active 便于上下架。
"""
from django.db import models
from django.utils import timezone


class HomePagePic(models.Model):
    """主页轮播图 - 对应前端 homePagePic"""
    image = models.URLField(max_length=500, verbose_name='图片链接')
    title = models.CharField(max_length=200, verbose_name='标题')
    description = models.CharField(max_length=500, verbose_name='介绍')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='排序')
    is_active = models.BooleanField(default=True, verbose_name='是否启用')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        ordering = ['sort_order']
        verbose_name = '主页轮播图'
        verbose_name_plural = '主页轮播图'

    def __str__(self):
        return self.title


class Board(models.Model):
    """主要介绍板块 - 对应前端 boards"""
    image = models.URLField(max_length=500, verbose_name='板块图片链接')
    title = models.CharField(max_length=100, verbose_name='标题')
    description = models.CharField(max_length=300, verbose_name='简介')
    link = models.CharField(max_length=200, blank=True, verbose_name='跳转链接')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='排序')
    is_active = models.BooleanField(default=True, verbose_name='是否启用')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        ordering = ['sort_order']
        verbose_name = '介绍板块'
        verbose_name_plural = '介绍板块'

    def __str__(self):
        return self.title


class Introduction(models.Model):
    """介绍文章走马灯 - 对应前端 introductions"""
    image = models.URLField(max_length=500, verbose_name='配图链接')
    title = models.CharField(max_length=200, verbose_name='标题')
    text = models.TextField(verbose_name='正文')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='排序')
    is_active = models.BooleanField(default=True, verbose_name='是否启用')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        ordering = ['sort_order']
        verbose_name = '介绍文章'
        verbose_name_plural = '介绍文章'

    def __str__(self):
        return self.title


class News(models.Model):
    """新闻 - 对应前端 news"""
    title = models.CharField(max_length=200, verbose_name='标题')
    intro = models.CharField(max_length=500, verbose_name='简介')
    content = models.TextField(verbose_name='正文')
    prim_pic = models.URLField(max_length=500, verbose_name='主图链接')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='排序（前端展示顺序，数值小靠前）')
    is_active = models.BooleanField(default=True, verbose_name='是否发布')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='发布时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        ordering = ['sort_order', '-created_at']
        verbose_name = '新闻'
        verbose_name_plural = '新闻'

    def __str__(self):
        return self.title


class NewsImage(models.Model):
    """新闻配图 - 对应 news.images 数组"""
    news = models.ForeignKey(News, on_delete=models.CASCADE, related_name='images')
    image_url = models.URLField(max_length=500, verbose_name='图片链接')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='排序')
    is_active = models.BooleanField(default=True, verbose_name='是否显示')

    class Meta:
        ordering = ['sort_order']
        verbose_name = '新闻配图'
        verbose_name_plural = '新闻配图'


class Course(models.Model):
    """课程页 - 对应前端 /class/<slug>，如 speedskating, PE-training"""
    slug = models.SlugField(max_length=100, unique=True, verbose_name='URL 片段')
    title = models.CharField(max_length=200, verbose_name='课程标题')
    hero_video_url = models.URLField(max_length=500, blank=True, verbose_name='Hero 视频链接')
    intro_text = models.TextField(blank=True, verbose_name='介绍正文（约300词）')
    image_1 = models.URLField(max_length=500, blank=True, verbose_name='图片1')
    image_2 = models.URLField(max_length=500, blank=True, verbose_name='图片2')
    image_3 = models.URLField(max_length=500, blank=True, verbose_name='图片3')
    image_4 = models.URLField(max_length=500, blank=True, verbose_name='图片4')
    image_5 = models.URLField(max_length=500, blank=True, verbose_name='图片5')
    image_6 = models.URLField(max_length=500, blank=True, verbose_name='图片6')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='排序')
    is_active = models.BooleanField(default=True, verbose_name='是否启用')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        ordering = ['sort_order', 'slug']
        verbose_name = '课程'
        verbose_name_plural = '课程'

    def __str__(self):
        return self.title


class NavItem(models.Model):
    """导航项 - 对应前端 navItems"""
    key = models.CharField(max_length=50, unique=True, verbose_name='标识')
    label = models.CharField(max_length=50, verbose_name='显示文字')
    path = models.CharField(max_length=200, verbose_name='路径')
    sort_order = models.PositiveIntegerField(default=0, verbose_name='排序')
    is_active = models.BooleanField(default=True, verbose_name='是否显示')
    created_at = models.DateTimeField(default=timezone.now, verbose_name='创建时间')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='更新时间')

    class Meta:
        ordering = ['sort_order']
        verbose_name = '导航项'
        verbose_name_plural = '导航项'

    def __str__(self):
        return self.label
