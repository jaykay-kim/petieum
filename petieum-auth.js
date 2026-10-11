// Drop-in authentication widget for a static website (GitHub Pages / Vercel).
// Requires petieum-auth-config.js to be loaded first.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const cfg = window.PETIEUM_AUTH_CONFIG ?? {};
const configured = /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(cfg.supabaseUrl || '') &&
  typeof cfg.supabasePublishableKey === 'string' &&
  !cfg.supabasePublishableKey.startsWith('YOUR_');

const supabase = configured ? createClient(cfg.supabaseUrl, cfg.supabasePublishableKey, {
  auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true }
}) : null;

const style = document.createElement('style');
style.textContent = `
#petieum-auth-launcher{position:fixed;right:20px;bottom:20px;z-index:2147483000;display:flex;align-items:center;gap:9px;background:#174d44;color:white;border:0;border-radius:28px;padding:13px 18px;font:600 14px system-ui,sans-serif;box-shadow:0 8px 24px #0003;cursor:pointer}
#petieum-auth-overlay{position:fixed;inset:0;z-index:2147483001;display:none;align-items:center;justify-content:center;background:#0009;padding:20px;font:14px system-ui,sans-serif}
#petieum-auth-overlay[data-open=true]{display:flex}
#petieum-auth-card{max-width:400px;width:100%;background:white;color:#1a2824;border-radius:18px;padding:28px;box-shadow:0 16px 44px #0003;position:relative}
#petieum-auth-card h2{margin:0 0 12px;font-size:22px}#petieum-auth-card p{line-height:1.6;color:#4c5c55}#petieum-auth-card button{cursor:pointer}
#petieum-google-btn{border:1px solid #ddd;border-radius:9px;padding:13px 12px;background:#fff;display:flex;align-items:center;justify-content:center;gap:12px;width:100%;font-weight:600;font-size:15px}
#petieum-logout-btn{border:1px solid #ddd;background:#f7f7f7;border-radius:9px;padding:11px 15px;width:100%;font-weight:600}
#petieum-auth-close{position:absolute;top:15px;right:17px;border:none;background:none;font-size:23px;color:#444}
#petieum-auth-status{font-size:12px;min-height:18px;color:#a12a22;margin-top:12px;white-space:pre-wrap;overflow-wrap:anywhere}
`;
document.head.append(style);

const overlay = document.createElement('section');
overlay.id = 'petieum-auth-overlay';
overlay.setAttribute('role', 'dialog');
overlay.setAttribute('aria-modal', 'true');
overlay.setAttribute('aria-label', '펫이음 계정 로그인');
overlay.innerHTML = `<div id="petieum-auth-card"><button type="button" id="petieum-auth-close" aria-label="닫기">×</button><h2>펫이음에 오신 것을 환영합니다 🐾</h2><p id="petieum-auth-greeting">Google 계정으로 안전하고 간편하게 로그인하세요.</p><div id="petieum-auth-signed-out"><button type="button" id="petieum-google-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 5.38 6.51 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.27 5.48-4.8 7.18l7.73 6C44.38 38.03 46.98 31.89 46.98 24.55z"/><path fill="#FBBC05" d="M10.53 28.59A14.41 14.41 0 019.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.2A23.85 23.85 0 000 24c0 3.86.92 7.5 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.92-2.13 15.89-5.8l-7.73-6C30.01 37.65 27.25 38.5 24 38.5c-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48z"/></svg>Google 계정으로 로그인</button></div><div id="petieum-auth-signed-in" hidden><p id="petieum-user-identity"></p><button type="button" id="petieum-logout-btn">로그아웃</button></div><div id="petieum-auth-status" role="status" aria-live="polite"></div></div>`;
const launcher = document.createElement('button');
launcher.type = 'button';
launcher.id = 'petieum-auth-launcher';
launcher.textContent = '🐾 로그인';
document.body.append(overlay, launcher);
const el = id => document.getElementById(id);
const message = msg => el('petieum-auth-status').textContent = msg || '';
function toggle(open){overlay.dataset.open = open ? 'true' : 'false';if(open)el('petieum-auth-close').focus();}
launcher.addEventListener('click', () => toggle(true));
el('petieum-auth-close').addEventListener('click', () => toggle(false));
overlay.addEventListener('click', e => {if(e.target === overlay)toggle(false);});
document.addEventListener('keydown', e => {if(e.key === 'Escape')toggle(false);});
function render(session){
 const user = session?.user;
 el('petieum-auth-signed-out').hidden = !!user;
 el('petieum-auth-signed-in').hidden = !user;
 el('petieum-auth-greeting').textContent = user ? '로그인되었습니다. 기존 펫이음 서비스를 계속 이용하실 수 있습니다.' : 'Google 계정으로 안전하고 간편하게 로그인하세요.';
 el('petieum-user-identity').textContent = user ? `로그인 계정: ${user.email || user.id}` : '';
 launcher.textContent = user ? `🐾 ${user.user_metadata?.full_name || '내 계정'}` : '🐾 로그인';
 window.dispatchEvent(new CustomEvent('petieum:auth', { detail: { user: user ? {id:user.id,email:user.email} : null }}));
}
el('petieum-google-btn').addEventListener('click', async () => {
 if(!supabase){message('로그인 설정이 아직 완료되지 않았습니다. petieum-auth-config.js를 확인하세요.');return;}
 message('구글 로그인 화면으로 이동합니다…');
 const {error}=await supabase.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});
 if(error)message('로그인을 시작하지 못했습니다: '+error.message);
});
el('petieum-logout-btn').addEventListener('click', async () => {
 if(!supabase)return;
 const {error}=await supabase.auth.signOut();
 message(error ? '로그아웃 오류: '+error.message : '로그아웃되었습니다.');
});
if(!supabase){ message('관리자 설정 대기 중입니다. Supabase URL과 공개키를 입력해 주세요.'); }
else{
 supabase.auth.onAuthStateChange((_event,session)=>render(session));
 supabase.auth.getSession().then(({data,error})=>{
  if(error)message('로그인 상태 확인 실패: '+error.message);
  render(data?.session);
 }).catch(err=>message('연결 실패: '+err.message));
}
