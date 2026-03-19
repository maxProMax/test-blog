create image for google cloud

FRONTEND
$ docker build --platform linux/amd64 -t blog-frontend .

$ docker build --platform linux/amd64 --build-arg "VITE_BACKEND_URL=https://blog-backend-81870856510.europe-west1.run.app" -t blog-frontend .

docker tag blog-frontend [USERNAME]/blog-frontend
$ docker tag blog-frontend thisismaxpro/blog-frontend

docker push [USERNAME]/blog-frontend
$ docker push thisismaxpro/blog-frontend

BACKEND
$ docker build --platform linux/amd64 -t blog-backend .

$ docker tag blog-backend thisismaxpro/blog-backend

$ docker push thisismaxpro/blog-backend
