"""
BASSC 速滑俱乐部 - DRF 序列化器
与前端数据结构一致，图片字段均为链接；无存储图时返回默认占位图。
"""
from rest_framework import serializers
from .models import HomePagePic, Board, Introduction, News, NewsImage, NavItem, Course
from .utils import get_image_url_for_api, get_presigned_media_url


class HomePagePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePagePic
        fields = ['id', 'image', 'title', 'description', 'sort_order', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['image'] = get_image_url_for_api(data.get('image'))
        return data


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'image', 'title', 'description', 'link', 'sort_order', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['image'] = get_image_url_for_api(data.get('image'))
        return data


class IntroductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Introduction
        fields = ['id', 'image', 'title', 'text', 'sort_order', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['image'] = get_image_url_for_api(data.get('image'))
        return data


class NewsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsImage
        fields = ['id', 'image_url', 'sort_order', 'is_active']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['image_url'] = get_image_url_for_api(data.get('image_url'))
        return data


class NewsSerializer(serializers.ModelSerializer):
    images = NewsImageSerializer(many=True, required=False)

    class Meta:
        model = News
        fields = [
            'id', 'title', 'intro', 'content', 'prim_pic',
            'sort_order', 'is_active', 'created_at', 'updated_at', 'images'
        ]
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['prim_pic'] = get_image_url_for_api(data.get('prim_pic'))
        # images 已由 NewsImageSerializer 处理默认图
        if not data.get('images'):
            data['images'] = [get_image_url_for_api(None)]
        return data

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        news = News.objects.create(**validated_data)
        for idx, img in enumerate(images_data):
            NewsImage.objects.create(news=news, sort_order=idx, **img)
        return news

    def update(self, instance, validated_data):
        images_data = validated_data.pop('images', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if images_data is not None:
            instance.images.all().delete()
            for idx, img in enumerate(images_data):
                NewsImage.objects.create(news=instance, sort_order=idx, **img)
        return instance


class NavItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavItem
        fields = ['id', 'key', 'label', 'path', 'sort_order', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = [
            'id', 'slug', 'title', 'hero_video_url', 'intro_text',
            'image_1', 'image_2', 'image_3', 'image_4', 'image_5', 'image_6',
            'sort_order', 'is_active', 'created_at', 'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['hero_video_url'] = get_presigned_media_url(data.get('hero_video_url'))
        for i in range(1, 7):
            key = f'image_{i}'
            if data.get(key):
                data[key] = get_image_url_for_api(data[key])
        return data
