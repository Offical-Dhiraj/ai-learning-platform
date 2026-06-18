import { useEffect, useState } from "react";

import Navbar from "./home/Navbar";
import GuestHero from "./home/GuestHero";
import LoggedInHero from "./home/LoggedInHero";

import Features from "./home/Features";
import HowItWorks from "./home/HowItWorks";
import Statistics from "./home/Statistics";
import Testimonials from "./home/Testimonials";
import Footer from "./home/Footer";

import {
  getProfile,
  getDashboardAPI
} from "@/features/auth/auth.api";

export default function Home() {
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  const [stats, setStats] = useState({
    totalTest: 0,
    accuracy: 0,
    avgScore: 0
  });

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const profileRes = await getProfile();
        setUser(profileRes.data.user);

        const dashboardRes =
          await getDashboardAPI();

        setStats(
          dashboardRes.data.stats || {}
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="bg-slate-950 text-white">

      <Navbar />

{token ? (
  <>
    <LoggedInHero
      user={user}
      stats={stats}
    />

    <Footer />
  </>
) : (
  <>
    <GuestHero />

    <Features />

    <HowItWorks />

    <Statistics />

    <Testimonials />

    <Footer />
  </>
)}
    </div>
  );
}