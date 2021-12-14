from django.conf.urls import url                                                                                                                              
from . import views
from django.urls import path


urlpatterns = [ 
    path('rast_val/<slug:lat>/<slug:lon>/', views.get_salt),
    # path('city_val/<slug:city>/', views.get_city_coords),
    # url(r'pgmap/', views.show_map, name="folium_map"),
    url(r'map/', views.show_map, name="mappostgre"),
    url(r'mapwms/', views.show_map_2, name="mapgeoserver")
]