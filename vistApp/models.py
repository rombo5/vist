# from django.contrib.auth.models import User
# from django.db import models
#
#
# class InPol(models.Model):
#     def inside(y, yp, x, xp, ypP, xpP, inPolygon):
#         if (((yp <= y and y < ypP) or (ypP <= y and y < yp)) and (
#                     x > (xpP - xp) * (y - yp) / (ypP - yp) + xp)):
#             inPolygon = not inPolygon
#             return inPolygon
