# Happy: Re Porting Manual
이 매뉴얼은 linux 환경에서 AllEat을 clone하여 빌드 및 배포하는 방법에 대한 가이드입니다.
# 0. 요구사항
- Ubuntu 20.04.6 LTS
	- Docker version 27.1.1, build 6312585
	- Docker Compose version v2.29.1
	- openjdk 17.0.12 2024-07-16
		- 상세사항
			- OpenJDK Runtime Environment (build 17.0.12+7-Ubuntu-1ubuntu220.04)
			- OpenJDK 64-Bit Server VM (build 17.0.12+7-Ubuntu-1ubuntu220.04, mixed mode, sharing)
# 1. 빌드
AllEat git repository를 clone 후, `git_root/backend/AllEat` 로 이동하여 실행:
```bash
chmod +x gradlew
./gradlew build
```
# 2. 환경 변수 file 구성
다음 Template를 모두 채운 뒤 git root 폴더에 `.env` 이름으로 배치하세요.
```bash
# .env file

# General environment variables
SERVICE_DOMAIN=https://drive.google.com/file/d/1D7KhJur3USlt7ndANP07usnwXZDMe4YI/view

# Security
JWT_SECRET=f35bcda6447d58d40b97c07bdff5197458a74627b7cd3e354a9efc3d090db3cc

# Spring container environment variables
DB_DOMAIN=localhost:3306
DB_CONNECTION=alleat
DB_USERNAME=root
DB_PASSWORD=kk1231
GOOGLE_CLIENT_ID=936574812414-vhv2et34n3dm85s271qe8rcb6vunp62p.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NAVER_CLIENT_ID=40uCYT84k8_tj_eUakSw
NAVER_CLIENT_SECRET=vwPX4RlFtZ
KAKAO_CLIENT_ID=d9d96f3f364dcc5d5e151c8b27bbe1ce
KAKAO_CLIENT_SECRET=77c1200e9defa29ee982a2463c70f918

# OpenAI API environment variables
OPENAI_API_KEY=sk-NVF_xSIB_73GhIqRj_T_eA6StyChHiTUzChBFDHW1GT3BlbkFJ1Q8apUwvWPijNlRv9d7knTxBvcj7X2MIqCVnI9SOEA

# FastAPI container environments variables
TEST_LOCAL=http://localhost:3000
FAST_API=https://j11b104.p.ssafy.io/fast-api
FIREBASE_CONFIG='./firebase-admin-config.json'

```

# 3. Deploy
git root 에서 실행
```bash
docker compose -f ./docker-compose.yml up down
```
이후 실행
```bash
docker compose -f ./docker-compose.yml up -d
```