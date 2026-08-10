# 세일즈콜 코칭 대시보드

## 배포 방법
1. 이 폴더 전체 내용을 `donggyukim-sys/salescall` 레포 루트에 커밋 & 푸시
2. Vercel 프로젝트(`salescall-8nig`)가 해당 레포에 연결되어 있으면 자동으로 재배포됩니다

## 데이터 갱신 방법
`data/analytics.json`만 새 분석 결과로 교체해서 커밋하면, 코드 변경 없이 대시보드 화면이 자동으로 최신 데이터를 반영합니다.

## 로컬 실행
```bash
npm install
npm run dev
```
