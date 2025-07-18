a=[1,2,3]
try:
  print(a[0])
  print(a[4])
except Exception as e:
  print(e)
  print(type(e))