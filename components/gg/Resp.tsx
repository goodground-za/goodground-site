/**
 * One string per breakpoint (README 3.4): `short` on phones, `long` from 768 up.
 * Both are in the HTML and CSS shows one, so nothing is ever truncated. The
 * hidden copy is display:none, so assistive tech reads only the visible one.
 */
export function Resp({ long, short }: { long: string; short?: string }) {
  if (!short) return <>{long}</>;
  return (
    <>
      <span className="gg-resp-short">{short}</span>
      <span className="gg-resp-long">{long}</span>
    </>
  );
}
