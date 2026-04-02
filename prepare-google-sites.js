const fs = require('fs');
const path = require('path');

const GITHUB_REPO = 'LeoMoreiraDesign/sos-assets';
const BRANCH = 'master';
const BASE_URL = `https://cdn.jsdelivr.net/gh/${GITHUB_REPO}@${BRANCH}/pdp-app/dist/`;

// Caminhos dos arquivos
const distPath = path.join(__dirname, 'pdp-app', 'dist');
const indexPath = path.join(distPath, 'index.html');
const outputPath = path.join(__dirname, 'pdp-app', 'dist', 'google-sites.html');

if (!fs.existsSync(indexPath)) {
  console.error('Erro: dist/index.html não encontrado. Execute npm run build primeiro.');
  process.exit(1);
}

let html = fs.readFileSync(indexPath, 'utf8');

// 1. Injetar a URL Base para o React carregar as imagens corretamente em qualquer lugar
const globalInjecao = `<script>window.ASSETS_BASE_URL = '${BASE_URL}';</script>`;
html = html.replace('<head>', `<head>\n    ${globalInjecao}`);

// 2. Substituir caminhos de assets do cabeçalho (ex: JS e CSS da build)
html = html.replace(/src="\/assets\//g, `src="${BASE_URL}assets/`);
html = html.replace(/href="\/assets\//g, `href="${BASE_URL}assets/`);
html = html.replace(/href="\/logo-leo-design\.png"/g, `href="${BASE_URL}logo-leo-design.png"`);
html = html.replace(/src="\/logo-leo-design\.png"/g, `src="${BASE_URL}logo-leo-design.png"`);

// 3. Substituir caminhos de produtos no HTML (caso existam na renderização estática)
html = html.replace(/src="\/products\//g, `src="${BASE_URL}products/`);

fs.writeFileSync(outputPath, html);

console.log('✅ google-sites.html gerado com sucesso!');
console.log('🔗 Assets Base URL:', BASE_URL);
