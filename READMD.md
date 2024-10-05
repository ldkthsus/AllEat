# AllEat : 식단 식비 통합 자동관리 서비스

![Happyre](readmeimg/main.png)

## 🚩 목차

1. [기획 배경](#✨-기획-배경)
2. [서비스 소개](#✨-서비스-소개)
3. [화면 정의서](#✨-화면-정의서) 
4. [기능 소개](#✨-기능-소개)
5. [기술 스택](#✨-기술-스택)
6. [프로젝트 일정 및 기타 산출물](#✨-프로젝트-일정-및-기타-산출물)
7. [팀원 소개 및 소감](#✨-팀원-소개-및-소감)

## ✨ 기획 배경

### 개요

- 거래내역을 기반으로 수기로만 작성됐던 일반 식단 및 식비 서비스를 한번에 손쉽게 관리
- 2024 소비트렌드를 보면 자기관리가 열풍 및 건강식단 관심도 증가
- 건강식단을 유지하는 과정에서 식비 관리는 쉽지가 않다는 걸 확인할 수 있다.

### 기존 어플 조사 및 설문조사

0. 설문조사 시행
![설문조사0](readmeimg/설문조사0.png)

1. 기존 어플의 이런 점이 불편했다.
![설문조사1](readmeimg/설문조사1.png)

2. 이런 기능이 추가/개선되면 사용할 의향이 있다.
![설문조사2](readmeimg/설문조사2.png)


### 서비스 목표

- 식단 수기 입력이 불편하다 + 식비 동시 관리 기능이 있으면 좋겠다.
    > **거래내역을 추적하여 사용자 식단 및 식비 기록 자동화**
- 사등을 통한 식단 자동 기록이 있으면 좋겠다.
    > **AI를 통해 사진 분석 및 식단 기록**

## ✨ 서비스 소개

### 페르소나

- 건강한 식단을 챙기지만 식비를 효율적이게 관리를 못하는 사람
- 식비를 줄이기는 하지만 충분한 영양소를 보충하지 못하는 사람
- 식단 및 식비 수기 작성 떄문에 어플 사용이 불편한 사람

### 기대효과

- **거래내역을 통한 등록**
  - 수기등록 최소화를 통한 유저 편의성 증가
  
- **사진 촬영으로 식단 등록**  
  - 이름 모를 메뉴 등 등록 시 애매한 정보를 AI를 통해 객관적으로 등록
  - 수기 등록 또한 최소화

- **식단과 식비를 한번에 관리**
  - 동시 기록 및 관리를 통한 효율적인 레포트 제공

## ✨ 화면 정의서

초기 페이지|로그인 페이지|회원 가입|메인 페이지
-----|-----|-----|-----
![초기페이지](readmeimg/startpage.png)|![로그인페이지](readmeimg/signin.png)|![회원가입](readmeimg/signup.png)|![메인페이지](readmeimg/myhome.jpg)

식단 등록|메뉴 등록|사진 등록|수기 등록
-----|-----|-----|-----
![식단등록](readmeimg/create-oreo.png)|![메뉴등록](readmeimg/add-menu.png)|![카메라](readmeimg/camera.png)|![수기등록](readmeimg/create-menu.png)

일간 레포트|주간 레포트|월간 레포트|식비 내역
-----|-----|-----|-----
![일간](readmeimg/dayreport.png)|![주간](readmeimg/weekreport.png)|![월간](readmeimg/monthreport.png)|![식비내역](readmeimg/logpage.png)

페이 머니|마이 페이지|내 정보 수정|---
-----|-----|-----|-----
![페이머니](readmeimg/paymoney.png)|![마이페이지](readmeimg/mypage.png)|![업데이트](readmeimg/mypageupdate.png)|---


## ✨ 기능 소개

- **거래 내역 기반 기록**
  - 

- **AI를 통한 사진 촬영 기록**
  - 

- **식단 식비 추척을 통한 레포트**
  - 

## ✨ 기술 스택

- **프론트엔드** : React-Native, TypeScript, Redux-Toolkit, Tailwindcss
- **백엔드** : Spring Boot, Spring Security, JWT, Oauth 2.0, Fast-api
- **인프라** : Docker, Nginx, Jenkins, MySQL, Certbot, EC2
- **특화 기술** : YOLOv10, OpenAI
- **이슈 관리** : JIRA, Mattermost, Notion, Gitlab

### 아키텍처 설계도

![architecture](./readmeimg/arch.png)

## ✨ 프로젝트 일정 및 기타 산출물

### 프로젝트 일정

**전체 일정** : 2024.08.26 ~ 2024.10.11(7주)

- **기획** : 2024.08.26 ~ 2024.09.06(2주)
- **개발** : 2024.09.09 ~ 2024.10.11(5주)


### 플로우 차트


### ERD
![ERD](./readmeimg/erd.png)


### API 명세서
![API명세서0](./readmeimg/api0.png)
![API명세서1](./readmeimg/api1.png)
![API명세서2](./readmeimg/api2.png)

## ✨ 팀원 소개 및 소감