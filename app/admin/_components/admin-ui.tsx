import type { ReactNode } from "react";
export function PageTitle({eyebrow,title,children}:{eyebrow:string;title:string;children?:ReactNode}) { return <div className="admin-title"><div><p>{eyebrow}</p><h1>{title}</h1></div>{children}</div>; }
export function Status({children,tone="ok"}:{children:ReactNode;tone?:"ok"|"warn"|"danger"}) { return <span className={`status ${tone}`}>{children}</span>; }
export function DemoTag() { return <span className="demo-tag">● Dados demonstrativos</span>; }
