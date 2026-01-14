'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { Reveal } from "@/components/motion/reveal";

const fitSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email."),
  city: z
    .string()
    .min(2, "City is required.")
    .max(48, "That looks a little long."),
});

type FitFormValues = z.infer<typeof fitSchema>;

export function FitForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<FitFormValues>({
    resolver: zodResolver(fitSchema),
  });

  const onSubmit = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        reset();
        resolve();
      }, 800);
    });
  };

  return (
    <section className="mt-20 md:mt-24">
      <Reveal
        viewportMargin="-10% 0px -20% 0px"
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-8 rounded-[28px] border border-border/70 bg-card/70 p-6 shadow-subtle backdrop-blur-xl md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-8"
      >
        <div className="space-y-4">
          <Text variant="caption" className="text-muted-foreground">
            Private fitting list
          </Text>
          <Text variant="h2" className="text-foreground">
            Be first to try limited runs.
          </Text>
          <Text variant="body" className="text-muted-foreground">
            Clevards releases arrive in small drops. Share a contact and a city
            and we&apos;ll quietly let you know when a frame lands near you.
          </Text>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 text-sm text-muted-foreground"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@studio.co"
              {...register("email")}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <Text variant="caption" className="text-amber-300">
                {errors.email.message}
              </Text>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              placeholder="Paris / Berlin / Tokyo"
              {...register("city")}
              aria-invalid={!!errors.city}
            />
            {errors.city && (
              <Text variant="caption" className="text-amber-300">
                {errors.city.message}
              </Text>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              aria-live="polite"
            >
              {isSubmitting ? "Sending..." : "Request a fitting"}
            </Button>
            <Text variant="small" className="text-muted-foreground leading-relaxed text-[10px]">
              No campaigns, no weekly sends. Only launch notes for pieces that
              match your profile.
            </Text>
          </div>
          {isSubmitSuccessful && (
            <Text variant="caption" className="pt-1 text-emerald-300">
              Request received. We&apos;ll be in touch before the next drop.
            </Text>
          )}
        </form>
      </Reveal>
    </section>
  );
}

