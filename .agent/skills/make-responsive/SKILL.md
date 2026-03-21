---
name: make-responsive
description: Best practices for making static or Figma-generated designs responsive across all breakpoints (desktop, tablet, mobile) using Tailwind CSS.
---

# Responsive Design with Tailwind CSS

When converting static designs (like those from Figma) into responsive web pages, or fixing auto-generated code that uses absolute/fixed values, follow these guidelines:

## 1. Avoid Fixed Dimensions
Auto-generated tools often output strict pixel values like `w-[870px]` or `h-[500px]`. This breaks on smaller screens.
- **DO NOT USE**: `w-[870px]`, `w-[1200px]`, `h-[500px]`
- **USE**: `w-full max-w-[870px]`, `min-h-[500px]`, or responsive classes like `w-full md:w-[870px]`.

## 2. Dynamic Padding and Margins
Static designs often have massive paddings (e.g., `px-[200px]`) which crush content on mobile.
- **DO NOT USE**: `px-[200px]`, `py-[100px]`
- **USE**: `px-5 md:px-12 lg:px-[200px]`, `py-10 lg:py-[100px]`

## 3. Flex and Grid Layouts
Elements placed side-by-side need to stack on mobile devices.
- **DO NOT USE**: `flex flex-row` statically for all screen sizes.
- **USE**: `flex flex-col lg:flex-row`.
- **For Grids**: Use `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` instead of fixed column counts.

## 4. Typography Scaling
Text sizes like `text-[66px]` are too large for mobile phones. Use Tailwind's `clamp` or responsive text sizes.
- **DO NOT USE**: `text-[66.4px]`
- **USE**: `text-[clamp(2.5rem,5vw,66.4px)]` or `text-4xl md:text-5xl lg:text-[66.4px]`.

## 5. Remove Absolute Positioning for Structure
Figma often uses `absolute left-[200px] top-[100px]` for layout. This completely breaks on mobile.
- **FIX**: Refactor absolute positioning to use Flexbox or CSS Grid constraints. If it must be absolute (like a background decoration), ensure it has responsive bounds (e.g. `hidden md:block` if it interferes with mobile).

## Scripting Tip for Large Files
If dealing with thousands of lines of auto-generated code, write a local Node.js or Python script that uses RegEx to safely map `w-[XXpx]` to `w-full max-w-[XXpx]` and `px-[XXpx]` to `px-6 md:px-[XXpx]` to quickly establish a baseline of responsiveness before manual tweaking.
