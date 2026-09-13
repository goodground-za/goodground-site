import { launchAvailability, launchOffer } from "@/content/websiteLaunch";

/**
 * The availability callout, shown wherever a decision gets made.
 *
 * It states the current availability Johandre confirmed, with the reason behind
 * the number beside it so it reads as a constraint on the studio's time rather
 * than as a squeeze on the reader.
 *
 * FALLBACK IS THE POINT. With `launchAvailability.enabled` set to false this
 * does not disappear, it drops back to the standing monthly-capacity statement,
 * which is true in any month. So switching the dated claim off never leaves a
 * gap where the page used to say something about availability.
 *
 * There is no counter and no countdown. The number is a string a person wrote.
 */
export function LaunchAvailability({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const live = launchAvailability.enabled;

  return (
    <div className={`gg-launch__avail gg-launch__avail--${tone}`}>
      <span className="gg-launch__avail-dot" aria-hidden="true" />
      <p>
        <strong>{live ? launchAvailability.message : launchOffer.capacityLine}</strong>{" "}
        <span>{live ? launchAvailability.note : ""}</span>
      </p>
    </div>
  );
}
