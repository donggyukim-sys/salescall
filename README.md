# 세일즈콜 코칭 대시보드

SCORE-7 프레임워크로 분석한 세일즈콜 결과를 일 단위로 보여주는 정적 대시보드입니다.
빌드 과정이 없어 Vercel에 그대로 올라갑니다.

## 무엇이 올라가나 (개인정보 원칙)

이 저장소에는 **분석 결과 요약만** 들어갑니다: 날짜, 콜 수, 콜유형 분포, 7축 점수,
종합 점수·등급, 코칭 문구, 컴플라이언스 플래그 **개수**.
**통화 녹음·전사본·인용문·전화번호 등 개인정보는 담기지 않습니다.**
`.gitignore`가 오디오/전사 파일의 커밋을 원천 차단합니다.

## 구조

```
index.html            대시보드 (단일 파일, 외부 의존성은 Chart.js CDN 하나)
data/analytics.json   대시보드가 읽는 정제 데이터 (여기만 갱신하면 됨)
vercel.json           정적 배포 설정
```

## 데이터 갱신 흐름

1. '내 컴퓨터에서 실행' Cowork 세션에서 `sales-call-analyzer` 스킬로 그날 콜을 분석.
2. 스킬의 `export_dashboard.py`가 분석 결과에서 개인정보를 제거한 레코드를
   이 저장소의 `data/analytics.json`에 append.
3. 변경을 커밋·푸시하면 Vercel이 자동 재배포.

```bash
git add data/analytics.json
git commit -m "analytics: 2026-07-29"
git push
```

## 최초 배포

1. 이 파일들을 저장소(`donggyukim-sys/salescall`)에 푸시.
2. [vercel.com](https://vercel.com) → Add New → Project → 이 저장소 Import.
   Framework Preset은 **Other**(정적) 그대로 두고 Deploy.
3. **접근 제한(권장)**: 성과 데이터이므로 완전 공개는 피하세요.
   Vercel 프로젝트 → Settings → **Deployment Protection**에서 비밀번호/조직 보호를 켭니다.

## 팀 확장

`data/analytics.json`의 `reps`에 상담원을 추가하면 상단 드롭다운으로 전환됩니다.
여러 명이 쌓이면 팀 비교 뷰(평균 대비 개인, 랭킹)를 이 위에 얹을 수 있습니다.
