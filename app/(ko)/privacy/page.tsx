export default function Privacy() {
  return (
    <div className="prose prose-gray max-w-none">
      <h1>개인정보처리방침</h1>
      <p>최종 업데이트: {new Date().toLocaleDateString("ko-KR")}</p>
      <h2>수집하는 정보</h2>
      <p>본 사이트는 Google Analytics 및 AdSense를 통해 익명의 방문자 통계를 수집합니다. 개인 식별 정보는 수집하지 않습니다.</p>
      <h2>쿠키 사용</h2>
      <p>광고 서비스(Google AdSense) 제공을 위해 쿠키를 사용할 수 있습니다. 브라우저 설정에서 쿠키를 비활성화할 수 있습니다.</p>
      <h2>제3자 서비스</h2>
      <p>Google AdSense를 통해 광고가 표시될 수 있으며, Google의 개인정보처리방침이 적용됩니다.</p>
      <h2>문의</h2>
      <p>개인정보 관련 문의사항은 사이트 관리자에게 연락해 주세요.</p>
    </div>
  );
}
