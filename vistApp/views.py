# -*- coding: utf-8 -*-
import json
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt



# Create your views here.
from django.shortcuts import render


def base(request):
    return render(request, 'site/base.html')
####

@csrf_exempt
def inPolygon(request):
        if request.method == 'POST':
            data = json.loads(request.body)
            inPolygon = False

            x = data['point'][0]
            y = data['point'][1]
            for i in range(len(data['polygon'])):
                xp = data['polygon'][i][0]
                yp = data['polygon'][i][1]
                xp_prev = data['polygon'][i - 1][0]
                yp_prev = data['polygon'][i - 1][1]

                if (((yp <= y and y < yp_prev) or (yp_prev <= y and y < yp)) and (x > (xp_prev - xp) * (y - yp) / (yp_prev - yp) + xp)):
                    inPolygon = not inPolygon



            response = {u'inPolygon': inPolygon}
            return JsonResponse(response)

