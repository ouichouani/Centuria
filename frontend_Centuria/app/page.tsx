'use client' ;
import { redirect } from "next/navigation";

export default function Home() {
  // let token = localStorage.getItem('JWT') ;
  // token ? redirect('/main/dashboard/board') : 
  redirect('/auth/login') ;
}
