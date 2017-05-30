from django.conf.urls import *

from vistApp.views import *

urlpatterns = [
    url(r'^inPolygon$', inPolygon, name='inPolygon')

]