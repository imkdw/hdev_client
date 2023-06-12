import styled from "styled-components";
import { getTimestamp, makeHash, makeSignature } from "../../utils/Payments/utils";

const Button = styled.button`
  width: 100px;
  height: 50px;
  background-color: yellowgreen;
`;

const PaymentsPage = () => {
  const P_MID = "welcometst"; // 가맹점 ID(가맹점 수정후 고정)
  const P_SIGNKEY = "QjZXWDZDRmxYUXJPYnMvelEvSjJ5QT09"; // 가맹점에 제공된 웹 표준 사인키(가맹점 수정후 고정)
  const P_TIMESTAMP = getTimestamp(); // util에 의해서 자동생성
  const P_OID = P_MID + "_" + getTimestamp(); // 가맹점 주문번호(가맹점에서 직접 설정)
  const P_AMT = "1000"; // 상품가격(특수기호 제외, 가맹점에서 직접 설정)
  const P_GOODS = "아메리카노";
  const P_UNAME = "김동우";
  const P_MNAME = "우동김";
  const P_MKEY = makeHash(P_SIGNKEY);
  const P_NEXT_URL = "https://api.hdev.site/payments/nextUrl";

  const signatureParams = {
    mkey: P_MKEY,
    P_AMT,
    P_OID,
    P_TIMESTAMP,
  };

  const P_SIGNATURE = makeSignature(signatureParams);

  return (
    <form action="https://tmobile.paywelcome.co.kr/smart/wcard" method="post" acceptCharset="EUC-KR">
      <input type="text" name="P_MID" value={P_MID} />
      <input type="text" name="P_OID" value={P_OID} />
      <input type="text" name="P_TIMESTAMP" value={P_TIMESTAMP} />
      <input type="text" name="P_AMT" value={P_AMT} />
      <input type="text" name="P_UNAME" value={P_UNAME} />
      <input type="text" name="P_MNAME" value={P_MNAME} />
      <input type="text" name="P_GOODS" value={P_GOODS} />
      <input type="text" name="P_SIGNATURE" value={P_SIGNATURE} />
      <input type="text" name="P_NEXT_URL" value={P_NEXT_URL} />
      <Button>asd</Button>
    </form>
  );
};

export default PaymentsPage;
