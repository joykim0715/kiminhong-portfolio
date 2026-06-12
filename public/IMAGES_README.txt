포트폴리오 이미지 넣는 방법
============================

모든 이미지는 portfolio/public/ 폴더 안에 넣습니다.
브라우저에서는 /파일명 으로 접근합니다. (public 은 URL에 안 붙음)

1) 프로필 사진 (히어로)
   - 저장 위치: public/images/profile.jpg
   - 권장: 정사각형 또는 3:4, 800px 이상
   - 코드: src/components/Hero.tsx 에서 Image 주석 해제
   - 예: <Image src="/images/profile.jpg" alt="..." fill />

2) 프로젝트 썸네일
   - 저장 위치: public/works/01.jpg, 02.jpg ...
   - 데이터 연결: src/data/works.ts 의 image 필드
   - 예: image: "/works/01.jpg"

3) 스토리 섹션 사진
   - 저장 위치: public/story/research.jpg 등
   - 데이터 연결: src/data/story.ts 의 photos[].image
   - 예: image: "/story/research.jpg"

4) 갤러리 / 영감 이미지
   - 저장 위치: public/gallery/...
   - 데이터 연결: src/data/inspiration.ts

폴더가 없으면 직접 만드세요:
  public/images/
  public/works/
  public/story/
  public/gallery/

파일 추가 후 개발 서버가 켜져 있으면 새로고침만 하면 됩니다.
