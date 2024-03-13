import { render } from "@react-email/render";
import { MagicLinkData } from "@/types/auth";
import { HookEmailType } from "@/types/hook";
import { ResouceEmailType } from "@/types/post";

import { Hook } from "@/components/email/Hook";
import { Resource } from "@component/email/Resource";
import { MagicLink } from "@component/email/MagicLink";

export function selectMailOptions(
  type: string,
  body: HookEmailType | ResouceEmailType | MagicLinkData,
) {
  let html;
  const mailOptions = {
    from: `UniswapHooks <${process.env.EMAIL_SENDER}>`,
    to: process.env.EMAIL_RECEIVERS!.split(","),
    subject: "",
    html: "",
  };

  console.log(mailOptions);

  switch (type) {
    case "hooks":
      html = render(Hook({ hook: body as HookEmailType }));
      return {
        from: mailOptions.from,
        to: process.env.EMAIL_RECEIVERS!.split(","),
        subject: "New hook submission",
        html,
      };
    case "resources":
      html = render(Resource({ resource: body as ResouceEmailType }));
      return {
        from: mailOptions.from,
        to: process.env.EMAIL_RECEIVERS!.split(","),
        subject: "New resource submission",
        html,
      };
    case "magic-link":
      html = render(MagicLink({ magicLink: body as MagicLinkData }));
      return {
        from: mailOptions.from,
        to: (body as MagicLinkData).email,
        subject: `Your magic link for UniswapHooks`,
        html,
      };
    default:
      throw new Error("Invalid submission type");
  }
}
