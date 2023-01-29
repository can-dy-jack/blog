// 保证 m < n
export default function random(m, n) {
  return Math.round(Math.random() * (n - m) + m);
}
