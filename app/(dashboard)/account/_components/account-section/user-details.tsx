import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import LineItem from "../line-item";

type UserDetailsProps = {
  user: User;
};

const UserDetails = ({ user }: UserDetailsProps) => {
  const { firstName = "", lastName = "", email = "", isEmailVerified } = user;
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "—";

  return (
    <section aria-labelledby="user-details-heading" className="space-y-4">
      <h2 id="user-details-heading" className="sr-only">
        User account details
      </h2>
      <LineItem
        label="Full Name"
        subLabel={fullName}
        action={
          <Button
            size="sm"
            type="button"
            variant="secondary"
            aria-label="Change your name"
          >
            Change Full Name
          </Button>
        }
      />
      <LineItem
        label="Email"
        subLabel={email}
        action={
          !isEmailVerified && (
            <Button
              size="sm"
              type="button"
              variant="secondary"
              aria-label="Verify your email"
            >
              Verify Email
            </Button>
          )
        }
      />
    </section>
  );
};

{
  /* <div className="md:col-span-2">
        {!session.user.isEmailVerified && (
          <div
            role="alert"
            aria-live="polite"
            className="flex items-center gap-1.5 mt-2"
          >
            <InfoIcon className="size-4 text-amber-600" aria-hidden />
            <Typography
              as="p"
              fluidSize="xs"
              className="text-amber-600 font-medium"
            >
              Email not verified.
            </Typography>

            <AlertDialog open={open} onOpenChange={handleModalChange}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-xs px-0 text-muted-foreground hover:text-foreground group gap-1"
                >
                  Verify Now{" "}
                  <ChevronRightIcon className="size-4 group-hover:translate-x-1 transition-200" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  aria-label="Close"
                >
                  <XIcon className="w-5 h-5 text-muted-foreground" />
                  <span className="sr-only">Close</span>
                </button>

                <div className="flex items-center justify-center gap-2 mb-4">
                  {[!showOtp, showOtp].map((active, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full ${
                        active ? "bg-primary" : "bg-muted-foreground/40"
                      }`}
                    />
                  ))}
                </div>

                {!showOtp && (
                  <div className="relative">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        <Typography
                          as="h3"
                          fluidSize="lg"
                          className="font-semibold"
                        >
                          Send Verification Email?
                        </Typography>
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <Typography
                          as="p"
                          fluidSize="sm"
                          className="text-muted-foreground"
                        >
                          We’ll send a verification link to{" "}
                          <span className="font-semibold text-foreground font-mono">
                            {maskEmail(session.user.email)}
                          </span>
                          .
                        </Typography>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    {error && (
                      <Typography
                        as="p"
                        fluidSize="xs"
                        className="text-destructive mt-2"
                      >
                        {error}
                      </Typography>
                    )}
                    {success && (
                      <Typography
                        as="p"
                        fluidSize="xs"
                        className="text-green-600 mt-2"
                      >
                        {success}
                      </Typography>
                    )}

                    <AlertDialogFooter className="mt-6">
                      <AlertDialogCancel disabled={loading}>
                        Cancel
                      </AlertDialogCancel>
                      <Button
                        type="button"
                        onClick={() => sendVerificationRequest(false)}
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Email"}
                      </Button>
                    </AlertDialogFooter>
                  </div>
                )}

                <AnimatePresence>
                  {showOtp && (
                    <motion.form
                      key="otp"
                      onSubmit={handleOtpSubmit}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="flex flex-col items-center gap-4 py-4"
                    >
                      <Typography
                        as="h3"
                        fluidSize="lg"
                        className="font-semibold"
                      >
                        Enter OTP
                      </Typography>
                      <Typography
                        as="p"
                        fluidSize="sm"
                        className="text-muted-foreground"
                      >
                        Please enter the 6-digit code sent to{" "}
                        <span className="font-semibold text-foreground font-mono">
                          {maskEmail(session.user.email)}
                        </span>
                        .
                      </Typography>

                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={setOtp}
                        containerClassName="justify-center"
                        inputMode="numeric"
                        ref={otpInputRef}
                      >
                        <InputOTPGroup>
                          {Array.from({ length: 6 }).map((_, i) => (
                            <InputOTPSlot key={i} index={i} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>

                      {error && (
                        <Typography
                          as="p"
                          fluidSize="xs"
                          className="text-destructive"
                        >
                          {error}
                        </Typography>
                      )}
                      {success && (
                        <Typography
                          as="p"
                          fluidSize="xs"
                          className="text-green-600"
                        >
                          {success}
                        </Typography>
                      )}

                      <Button
                        type="submit"
                        disabled={otp.length !== 6 || loading}
                        className="w-full"
                      >
                        {loading ? "Verifying..." : "Verify Email"}
                      </Button>

                      <div className="flex items-center gap-2 mt-2">
                        <Typography
                          as="span"
                          fluidSize="xs"
                          className="text-muted-foreground"
                        >
                          Didn’t get the code?
                        </Typography>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="px-2 py-0 h-auto text-xs"
                          onClick={() => sendVerificationRequest(true)}
                          disabled={resendCooldown > 0 || loading}
                        >
                          Resend
                          {resendCooldown > 0 ? ` (${resendCooldown}s)` : ""}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div> */
}

export default UserDetails;
