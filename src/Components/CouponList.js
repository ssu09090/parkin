import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    'https://xpcmyjuoztxkpzpfwplt.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwY215anVvenR4a3B6cGZ3cGx0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwMzI0NjAsImV4cCI6MjA2NTYwODQ2MH0.bos4C9Kd_TgdItTqVrbNtFXu-7pq403jnLLBjOi3oO0'
  );

const CouponList = ({ phone, couponData, onClose }) => {
    const [coupons, setCoupons] = useState(couponData || null);

    useEffect(() => {
        if (!couponData) {
            const fetchCoupons = async () => {
              const { data, error } = await supabase
                .from("coupons")
                .select("*")
                .eq("phone", phone)
                .single();
      
              if (error) {
                console.error("쿠폰 조회 실패:", error.message);
              } else {
                setCoupons(data);
              }
            };
      
            fetchCoupons();
          }
        }, [phone, couponData]);

      return (
        <div className="coupon-list-popup">
          <button className="close-btn" onClick={onClose}>×</button>
          <h3>내 쿠폰 정보</h3>
    
          {!coupons ? (
            <p>발급된 쿠폰이 없습니다.</p>
          ) : (
            <ul>
              <li>📱 <p>전화번호 뒷자리:</p> {phone.slice(-4)}</li>
              <li>🎁 <p>할인 혜택: </p>{coupons.type}</li>
              <li>🆔 <p>쿠폰 코드: </p>{coupons.code}</li>
              <li>📅 <p>발급일: </p>{new Date(coupons.created_at).toLocaleString()}</li>
              <li>✅ <p>상태: </p>{coupons.used ? "사용됨" : "미사용"}</li>
            </ul>
          )}
    
          <button className="back-btn" onClick={onClose}>← 뒤로 가기</button>
        </div>
      );
    };

export default CouponList;