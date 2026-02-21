from django.contrib import admin
from .models import HomePagePic, Board, Introduction, News, NewsImage, NavItem, Course


@admin.register(HomePagePic)
class HomePagePicAdmin(admin.ModelAdmin):
    list_display = ('title', 'sort_order', 'is_active')


@admin.register(Board)
class BoardAdmin(admin.ModelAdmin):
    list_display = ('title', 'sort_order', 'is_active')


@admin.register(Introduction)
class IntroductionAdmin(admin.ModelAdmin):
    list_display = ('title', 'sort_order', 'is_active')


class NewsImageInline(admin.TabularInline):
    model = NewsImage
    extra = 1


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'is_active')
    inlines = [NewsImageInline]


@admin.register(NavItem)
class NavItemAdmin(admin.ModelAdmin):
    list_display = ('label', 'path', 'sort_order', 'is_active')


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'sort_order', 'is_active')
    prepopulated_fields = {'slug': ('title',)}
