# 펫이음(PetIeum) 베타서비스 홈페이지

실제 베타 오픈을 가정한 정적 홈페이지입니다.

## 포함 파일
- `index.html`: 메인 랜딩페이지, 회원가입/구독/결제 데모
- `style.css`: 전체 디자인
- `script.js`: 모바일 메뉴, 요금제 선택, 결제 데모 모달
- `privacy.html`: 개인정보 처리방침 초안
- `terms.html`: 이용약관 초안
- `refund.html`: 환불·배송정책 초안
- `assets/`: 로고와 SVG 일러스트

## 배포 방법
1. GitHub 새 저장소 생성
2. 이 폴더의 파일을 저장소 최상위에 업로드
3. Vercel → New Project → GitHub 저장소 Import
4. Framework Preset은 Other 또는 기본값
5. Deploy 클릭

## 실제 오픈 전 체크리스트
- 사업자등록번호, 대표자, 주소, 고객센터 확정
- 통신판매업 신고번호 기입
- PG사 계약 및 실제 결제 SDK 연동
- 개인정보 처리방침 최종 검토
- 위치정보 이용 여부 검토
- 배송/반품/환불정책 확정
- 제품 효능·진단 오인 표현 재검토

## 백엔드 연결 아이디어
- 회원가입/로그인: Supabase Auth 또는 Firebase Auth
- 신청 데이터 저장: Supabase Table
- 결제: Toss Payments, PortOne 등 PG SDK
- 이메일 알림: Resend, SendGrid 등
