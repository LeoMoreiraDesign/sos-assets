const fs = require('fs');
const path = require('path');

const GITHUB_REPO = 'LeoMoreiraDesign/sos-assets';
const BRANCH = 'master';
const BASE_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_REPO}@${BRANCH}/pdp-app/dist`;

// Caminhos dos arquivos
const distPath = path.join(__dirname, 'pdp-app', 'dist');
const indexPath = path.join(distPath, 'index.html');
const outputPath = path.join(__dirname, 'pdp-app', 'dist', 'google-sites.html');

if (!fs.existsSync(indexPath)) {
  console.error('Erro: dist/index.html não encontrado. Execute npm run build primeiro.');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// 1. Substituir caminhos de assets (JS, CSS)
// Ex: src="/assets/index-xxx.js" -> src="https://cdn.jsdelivr.net/gh/..."
html = html.replace(/src="\/assets\//g, `src="${BASE_URL}/assets/`);
html = html.replace(/href="\/assets\//g, `href="${BASE_URL}/assets/`);

// 2. Substituir caminhos de imagens e logos na raiz do dist
// Ex: href="/logo-leo-design.png" -> href="https://cdn.jsdelivr.net/gh/..."
html = html.replace(/href="\/logo-leo-design\.png"/g, `href="${BASE_URL}/logo-leo-design.png"`);
html = html.replace(/src="\/logo-leo-design\.png"/g, `src="${BASE_URL}/logo-leo-design.png"`);

// 3. Substituir caminhos de imagens de produtos
// As imagens estão em dist/products/
html = html.replace(/src="\/products\//g, `src="${BASE_URL}/products/`);

// 4. Corrigir favicon se houver
html = html.replace(/href="\/favicon/g, `href="${BASE_URL}/favicon`);

// 5. Garantir que links internos do site funcionem se forem âncoras
// (Opcional, dependendo da lógica do React)

fs.writeFileSync(outputPath, html);

console.log('✅ google-sites.html gerado com sucesso em dist/google-sites.html');
console.log('🔗 Base URL utilizada:', BASE_URL);
