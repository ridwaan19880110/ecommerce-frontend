'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, isSignInWithEmailLink, signInWithEmailLink } from '../../firebase/firebaseClient';

export default function VerifyPage() {
  const router = useRouter();

  useEffect(() => {
    const confirmSignIn = async () => {
      if (typeof window !== 'undefined') {
        const email = window.localStorage.getItem('emailForSignIn');
        const role = window.localStorage.getItem('userRole');

        if (email && isSignInWithEmailLink(auth, window.location.href)) {
          try {
            await signInWithEmailLink(auth, email, window.location.href);
            alert(`Successfully signed in as ${email}`);

            // Redirect based on role
            if (role === 'seller') router.push('/seller/dashboard');
            else if (role === 'driver') router.push('/driver/dashboard');
            else router.push('/store');
          } catch (error: any) {
            alert('Verification failed: ' + error.message);
          }
        } else {
          alert('Missing email or invalid link');
        }
      }
    };

    confirmSignIn();
  }, [router]);

  return <p className="text-center mt-10">Verifying your email link...</p>;
}
