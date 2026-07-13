# สรุปโปรเจกต์ — Atom Portfolio Website

> Portfolio ของ **Teevin "Atom" Hiranlertprasert** — UX/UI & Visual Designer, Bangkok
> อัปเดตล่าสุด: 14 กรกฎาคม 2026

---

## 1. ภาพรวม

เว็บไซต์ portfolio แบบ **static site** (HTML/CSS/JS ล้วน ไม่มี framework, ไม่มี build tools) เปิดจากไฟล์ตรงๆ ได้ (`file://`) — ทรัพยากรภายนอกมีแค่ Google Fonts

- **สไตล์**: editorial minimalism อ้างอิง afternow.co — พื้นครีม, headline ใหญ่, เส้น hairline คั่น section
- **โทนสี**: ครีม `#F5F4F0` + น้ำเงิน navy/royal (rebrand จากเขียวเมื่อ 5 ก.ค. ตาม Hero_banner.png)
- **ฟ้อนต์**: Poppins + Noto Sans Thai (fallback ภาษาไทยอัตโนมัติ)

## 2. โครงสร้างไฟล์

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | หน้าหลัก: Hero (banner + animation), About, Services, Work grid 18 โปรเจกต์ + filter, Process, Contact, Footer |
| `css/style.css` | design tokens + layout ทั้งหมด (mobile-first) |
| `js/main.js` | PROJECTS array (การ์ด 18 ใบ), filter, scroll reveal, mobile nav, hero constellation |
| หน้า case study 18 ไฟล์ | `baania.html`, `smart-utilities.html`, `moc.html`, `tivlog.html`, `true-iservice.html`, `k-flo.html`, `wushu.html`, `nueu-cafe.html`, `korner-st.html`, `ordinary-bangkok.html`, `new-economy-academy.html`, `craftman-roastery.html`, `bangkok-university-bulletin.html`, `dca-book.html`, `tceb.html`, `nt-smart-life.html`, `cat-marketing.html`, `social-media.html` |
| `images/` | รูปทั้งหมด (path มีช่องว่าง/อักขระพิเศษ — **ห้าม rename**, ทุก src ใช้ %20/%26 encoding แล้ว) |
| `design-spec.md`, `content.md`, `*-copy.md` | เอกสาร spec และ copy ของทีม (ไม่ถูกโหลดโดยเว็บ) |

## 3. ฟีเจอร์เด่น

- **Hero**: Hero_banner.png (ข้อความในภาพ) + Ken Burns zoom + แสง sheen + จุด data-point constellation ฟ้าอ่อน / มือถือ crop ไปฝั่งคลื่นแล้วโชว์ headline HTML แทน / มี `FUTURE VIDEO SLOT` comment รอสลับเป็นวิดีโอ
- **Work grid**: 18 การ์ด กดแล้วเปิดหน้า case study (ไม่ใช้ modal) + filter หมวด (UX/UI 7 · Branding 5 · Graphic 4 · Marketing & Social 2)
- **Case studies**: laptop mockup เลื่อนจอได้ (MOC, K-FLO, Tivlog, Wushu), phone mockup (Smart Utilities), social-post mockup (Social Media), X-stand mockup (TCEB), slider หลายหน้า, graphic style boards (NEA, Nueu Cafe, Ordinary Bangkok)
- **Accessibility**: alt ครบทุกรูป, focus-visible, `prefers-reduced-motion` ทุก animation, contrast ผ่าน WCAG (ตัวเลขอยู่ใน design-spec.md §2.1)

## 4. ทีม agent ถาวร (`~/.claude/agents/`)

| Agent | บทบาท |
|---|---|
| `wesnesday` | Content Writer — ภาษามืออาชีพ อ่านง่าย (≤ CEFR C2) ไม่แต่งข้อเท็จจริง |
| `tuesday` | UX/UI & Graphic Designer — ดูรูปจริงก่อนวาง, ไม่ crop ความหมาย, mockup/slider |

## 5. รายการที่ยังค้าง ([TBD])

1. **Korner St.** — ไฟล์ hero "1-01" ยังไม่ถูกก๊อปเข้า `images/projects/Korner st./` + ปี Timeline
2. **Social Media** — Timeline ในหน้ายัง "2017–2020" แต่ lead เป็น "Five years" (รอปีจริง)
3. **Craftman Roastery** — ปี Timeline (2019?)
4. **Tivlog** — เนื้อหา Challenge/Approach ยังเล่าเรื่อง video SaaS ขัดกับ lead ใหม่ (business matching)
5. **Contact** — ลิงก์ LinkedIn / Behance / Dribbble ยังเป็น `#`
6. **Hero video** — `videos/hero.mp4` ยังไม่มี (มี slot รอไว้แล้วใน index.html)
7. หน้าใหม่ 5 หน้า (moc, korner-st, ordinary-bangkok, bangkok-university-bulletin, tceb) มี Role/Timeline เป็น [TBD]

## 6. แนวทางขึ้นเว็บไซต์จริง (Deployment)

### ขั้นที่ 1 — เตรียมไฟล์ (แนะนำทำก่อนขึ้น)
- **บีบอัดรูป**: หลายไฟล์ใหญ่มาก (Hero_banner.png ~7MB, Hero Banner_Ord.png ~7MB, ภาพ landing ยาวๆ 1–4MB) โหลดผ่านเน็ตจะช้า → แปลงเป็น WebP/บีบ JPEG (คุณภาพ ~80) จะลดขนาดรวมได้ 60–80% โดยตาแทบแยกไม่ออก
- เก็บกวาดไฟล์ที่ไม่ใช้บนเว็บออกจากโฟลเดอร์ที่จะ deploy (ไฟล์ .md ของทีม, `images/Content/` ต้นฉบับ, `.DS_Store`)
- เติมข้อมูล [TBD] ในข้อ 5 ให้ครบ

### ขั้นที่ 2 — เลือกที่ hosting (ฟรีทั้งหมด เพราะเป็น static site)
| ตัวเลือก | เหมาะกับ | วิธี |
|---|---|---|
| **Netlify** (แนะนำ ง่ายสุด) | ไม่อยากใช้ git | ลากโฟลเดอร์ทั้งก้อนวางที่ app.netlify.com/drop ได้เลย เสร็จใน 1 นาที |
| **GitHub Pages** | อยากมี version control | สร้าง repo → push → เปิด Pages ใน Settings |
| **Vercel** | คุ้นเคย git เช่นกัน | import repo แล้ว deploy อัตโนมัติ |

⚠️ ชื่อไฟล์ที่มีช่องว่าง/ภาษาไทย/`&` ใช้บนเว็บ host ได้ (เรา encode ไว้ถูกแล้ว) แต่ถ้าเจอปัญหากับ host ไหน วิธีแก้ถาวรคือ rename ไฟล์เป็น kebab-case แล้วอัปเดต src — ทีมทำให้ได้

### ขั้นที่ 3 — โดเมนและเก็บตก
- ซื้อโดเมน (เช่น `atomdesigns.com` ~400–600 บาท/ปี จาก Namecheap/Cloudflare) แล้วชี้เข้า host — ทุกเจ้าข้างบนมี HTTPS ฟรีอัตโนมัติ
- เพิ่ม **favicon** และ **Open Graph image** (ภาพพรีวิวตอนแชร์ลิงก์) — ยังไม่มีทั้งคู่ แนะนำใช้ Hero_banner.png ย่อ
- เพิ่ม `<meta property="og:...">` ใน index.html เพื่อให้แชร์ใน LinkedIn/Facebook สวย
- ทดสอบบนมือถือจริงอีกรอบหลังขึ้นเว็บ

---
*สร้างโดยทีม agent: Design Director · Wesnesday (content) · Tuesday (UX/UI) · QA — ประสานงานโดย Claude*
