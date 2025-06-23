"use client";
import { Suspense } from "react";
import ResetPasswordForm from "./_components/resetPassword";

const ResetPasswordPage = () => {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
