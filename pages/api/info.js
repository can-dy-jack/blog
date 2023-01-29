export default function handler(req, res) {
  res.status(200).json({
    name: 'blog',
    app: 'next.js',
    description: '陈科衡的博客',
  });
}
