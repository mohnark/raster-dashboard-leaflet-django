from django.shortcuts import render
from django.db import connection
from django.http import JsonResponse

def get_salt(request, lat='', lon=''):
    try:
        latitude = float(lat.replace('x','.'))
        longitude = float(lon.replace('x','.'))
        'http://127.0.0.1:8000/salt/rast_val/-75x52698/39x10226/'
        """-75.52698,39.10226"""
        """QUERY FROM DATABASE"""
        with connection.cursor() as cursor:
            raw_query = f"SELECT ST_Value(rast, ST_SetSRID(ST_MakePoint({latitude},{longitude}),4326)) AS val FROM Kent_2017 WHERE ST_Intersects(rast, ST_SetSRID(ST_MakePoint({latitude},{longitude}),4326));"
            # print(raw_query)
            cursor.execute(raw_query)
            for val in cursor.fetchall():
                salt_val_17 = val
                break
        print(salt_val_17)
        with connection.cursor() as cursor:
            raw_query = f"SELECT ST_Value(rast, ST_SetSRID(ST_MakePoint({latitude},{longitude}),4326)) AS val FROM Kent_2013 WHERE ST_Intersects(rast, ST_SetSRID(ST_MakePoint({latitude},{longitude}),4326));"
            # print(raw_query)
            cursor.execute(raw_query)
            for val in cursor.fetchall():
                salt_val_13 = val
                break
        print(salt_val_13)

        return JsonResponse({'Value17': f'{salt_val_17[0]}', 'Value13': f'{salt_val_13[0]}'})
    except Exception as E:
        print(E)
        return JsonResponse({'Value17': '', 'Value13': ''})

def default_map(request):
    return render(request, 'default.html', {})

def show_map(request):
    return render(request, 'map_geo.html', {})

def show_map_2(request):
    return render(request, 'map_wms.html', {})