export default function Terms() {
  return (
    <div className="prose prose-gray max-w-none">
      <h1>이용약관</h1>
      <p>최종 업데이트: {new Date().toLocaleDateString("ko-KR")}</p>
      <h2>서비스 이용</h2>
      <p>본 사이트의 콘텐츠는 정보 제공 목적으로만 사용됩니다. 콘텐츠의 정확성을 보장하지 않으며, 이용으로 인한 손해에 대해 책임지지 않습니다.</p>
      <h2>저작권</h2>
      <p>본 사이트의 모든 콘텐츠는 저작권법의 보호를 받습니다. 무단 복제 및 배포를 금합니다.</p>
      <h2>면책조항</h2>
      <p>본 사이트는 외부 링크에 대한 책임을 지지 않습니다.</p>
    </div>
  );
}
