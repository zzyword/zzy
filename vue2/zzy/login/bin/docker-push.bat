
set image_name=custom_vue_demo
set image_version=0.20
set company_name=dc
set repository_name=swr.cn-east-2.myhuaweicloud.com

docker build -t %image_name%:%image_version% .
docker tag %image_name%:%image_version% %repository_name%/%company_name%/%image_name%:%image_version%
docker push %repository_name%/%company_name%/%image_name%:%image_version%
docker image rm %image_name%:%image_version% -f
docker image rm %repository_name%/%company_name%/%image_name%:%image_version% -f
