import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reusable function (used by useEffect + Razorpay handler)
  const refreshPremiumStatus = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error("Premium verification failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Safe useEffect (React 18 friendly)
  useEffect(() => {
    let isMounted = true;

    const verify = async () => {
      if (isMounted) {
        await refreshPremiumStatus();
      }
    };

    verify();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = order.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Connect to other developers",
        order_id: orderId,
        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
        //  Refresh premium after successful payment
        handler: refreshPremiumStatus,
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed", err);
    }
  };

  //  Loading state
  if (loading) {
    return <div className="m-10 text-xl">Checking premium status...</div>;
  }

  //  Already premium
  if (isUserPremium) {
    return (
      <div className="m-10 text-2xl font-bold text-green-600">
         You are already a Premium user
      </div>
    );
  }

  // 💳 Buy premium UI
  return (
    <div className="m-10">
      <div className="flex w-full">
        {/* Silver */}
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Silver Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- 100 connection requests per day</li>
            <li>- Blue Tick</li>
            <li>- 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-secondary"
          >
            Buy Silver
          </button>
        </div>

        <div className="divider divider-horizontal">OR</div>

        {/* Gold */}
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
          <h1 className="font-bold text-3xl">Gold Membership</h1>
          <ul>
            <li>- Chat with other people</li>
            <li>- Infinite connection requests per day</li>
            <li>- Blue Tick</li>
            <li>- 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary"
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
