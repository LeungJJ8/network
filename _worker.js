import { connect } from 'cloudflare:sockets';

let 哎呀呀这是我的ID啊 = "12345";
let 哎呀呀这是我的VL密钥 = "0ab4ed98-9ccb-48cc-96e4-366d63930a00";
let 私钥开关 = false;
let 咦这是我的私钥哎 = "";
let 隐藏订阅 = false;
let 嘲讽语 = "哎呀你找到了我，但是我就是不给你看，气不气，嘿嘿嘿";
let 我的优选 = [];
let 我的优选TXT = [];
let 启用反代功能 = true;
let 反代IP = 'ts.hpc.tw';
let 启用SOCKS5反代 = false;
let 启用SOCKS5全局反代 = false;
let 我的SOCKS5账号 = '';
let 我的节点名字 = '';
let 伪装网页 = 'www.baidu.com';
let 启用KV功能 = false;

export default {
  async fetch(访问请求, env, ctx) {
    const 读取我的请求标头 = 访问请求.headers.get('Upgrade');
    const url = new URL(访问请求.url);

    哎呀呀这是我的ID啊 = env.ID || 哎呀呀这是我的ID啊;
    哎呀呀这是我的VL密钥 = env.UUID || 哎呀呀这是我的VL密钥;
    我的优选 = env.IP ? env.IP.split('\n') : 我的优选;
    我的SOCKS5账号 = env.SOCKS5 || 我的SOCKS5账号;
    启用SOCKS5反代 = (env.SOCKS5OPEN === 'true') ? true : (env.SOCKS5OPEN === 'false' ? false : 启用SOCKS5反代);
    启用SOCKS5全局反代 = (env.SOCKS5GLOBAL === 'true') ? true : (env.SOCKS5GLOBAL === 'false' ? false : 启用SOCKS5全局反代);
    启用KV功能 = (env.KV === 'true') ? true : (env.KV === 'false' ? false : 启用KV功能);
    伪装网页 = env.URL || 伪装网页;
    我的节点名字 = env.PS || 我的节点名字;
    //只有当 KV 功能启用时才读取/设置 KV 反代IP
    if (启用KV功能) {
      // 从 KV 读取反代IP
      const stored反代IP = await env.PROXYIP.get("反代IP");
      if (stored反代IP) {
        反代IP = stored反代IP;
      }

      // 处理获取反代IP的请求
      if (url.pathname === '/get-proxy-ip') {
        return new Response(反代IP, {
          status: 200,
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        });
      }

      // 处理设置反代IP的请求
      if (url.pathname === '/set-proxy-ip' && 访问请求.method === 'POST') {
        try {
          const newProxyIP = await 访问请求.text();
          await env.PROXYIP.put("反代IP", newProxyIP);
          反代IP = newProxyIP; // 更新内存中的值
          return new Response("反代IP 已更新", { status: 200 });
        } catch (error) {
          console.error("更新反代IP失败:", error);
          return new Response("更新反代IP失败", { status: 500 });
        }
      }

    // 读取上次保存的TXT列表
      if (url.pathname ==='/set-txt-urls' && 访问请求.method ==='GET'){
              const storedTXT = await env.PROXYIP.get("优选TXT");
               return  new Response(storedTXT,{ status : 200});
           }

         if(url.pathname ==='/set-txt-urls' && 访问请求.method === 'POST') {
              try {
                  const newTxtUrls = await 访问请求.text();

                  const urls = newTxtUrls.split(',').map(url=> url.trim()).filter(Boolean);
                  const validateUrls = await Promise.all(
                    urls.map(async url =>{
                      try{
                          new URL(url)
                        const testFetch = await fetch(url, {method: "GET", })
                        if(testFetch.ok){
                            return url;
                          }else {
                            console.error('无效URL:',url,"返回状态码:",testFetch.status)
                            return null
                          }
                        }
                      catch (e){
                            console.error('无效URL:',url,"原因:", e)
                          return null
                        }
                      })
                   );
                   我的优选TXT = validateUrls.filter(Boolean);

                  await env.PROXYIP.put("优选TXT", 我的优选TXT.join(","))
                    return new Response("TXT URLS 已更新",{ status : 200});
            } catch(error)
            {
                console.error("更新txt地址失败", error)
                  return new Response("更新TXT URL失败",{ status : 500})
            }
          }
     }



    if (!读取我的请求标头 || 读取我的请求标头 !== 'websocket') {

      if (我的优选TXT && 我的优选TXT.length > 0) {
        const 优选节点集合 = [];

        for (let txtURL of 我的优选TXT) {
          try {
            const 读取优选文本 = await fetch(txtURL);
            const 转换优选文本 = await 读取优选文本.text();
            const 优选节点 = 转换优选文本.split('\n').map(line => line.trim()).filter(line => line);
            优选节点集合.push(...优选节点);
          } catch (error) {
            console.error(`读取优选文本文件失败: ${txtURL}`, error);
          }
        }

        我的优选 = 优选节点集合;
      }

      switch (url.pathname) {
        case `/${哎呀呀这是我的ID啊}`: {
          const 订阅页面 = 给我订阅页面(哎呀呀这是我的ID啊, 访问请求.headers.get('Host'));
          return new Response(`${订阅页面}`, {
            status: 200,
            headers: { "Content-Type": "text/html;charset=utf-8" }
          });
        }
        case `/${哎呀呀这是我的ID啊}/${转码}${转码2}`: {
          if (隐藏订阅) {
            return new Response(`${嘲讽语}`, {
              status: 200,
              headers: { "Content-Type": "text/plain;charset=utf-8" }
            });
          } else {
            const 通用配置文件 = 给我通用配置文件(访问请求.headers.get('Host'));
            return new Response(`${通用配置文件}`, {
              status: 200,
              headers: { "Content-Type": "text/plain;charset=utf-8" }
            });
          }
        }
        case `/${哎呀呀这是我的ID啊}/${小猫}${咪}`: {
          if (隐藏订阅) {
            return new Response(`${嘲讽语}`, {
              status: 200,
              headers: { "Content-Type": "text/plain;charset=utf-8" }
            });
          } else {
            const 小猫咪配置文件 = 给我小猫咪配置文件(访问请求.headers.get('Host'));
            return new Response(`${小猫咪配置文件}`, {
              status: 200,
              headers: { "Content-Type": "text/plain;charset=utf-8" }
            });
          }
        }
        default:
          url.hostname = 伪装网页;
          url.protocol = 'https:';
          访问请求 = new Request(url, 访问请求);
          return fetch(访问请求);
      }
    } else if (读取我的请求标头 === 'websocket') {
      // 处理 WebSocket 请求
      if (私钥开关) {
        const 验证我的私钥 = 访问请求.headers.get('my-key');
        if (验证我的私钥 === 咦这是我的私钥哎) {
          return await 升级WS请求(访问请求);
        }
      } else {
        return await 升级WS请求(访问请求);
      }
    }
  }
};

async function 升级WS请求(访问请求) {
  const 创建WS接口 = new WebSocketPair();
  const [客户端, WS接口] = Object.values(创建WS接口);
  WS接口.accept();
  const 读取我的加密访问内容数据头 = 访问请求.headers.get('sec-websocket-protocol');
  const 解密数据 = 使用64位加解密(读取我的加密访问内容数据头);
  const { TCP接口, 写入初始数据 } = await 解析VL标头(解密数据);
  建立传输管道(WS接口, TCP接口, 写入初始数据);
  return new Response(null, { status: 101, webSocket: 客户端 });
}
function 使用64位加解密(还原混淆字符) {
  还原混淆字符 = 还原混淆字符.replace(/-/g, '+').replace(/_/g, '/');
  const 解密数据 = atob(还原混淆字符);
  const 解密_你_个_丁咚_咙_咚呛 = Uint8Array.from(解密数据, (c) => c.charCodeAt(0));
  return 解密_你_个_丁咚_咙_咚呛.buffer;
}

async function 解析VL标头(VL数据, TCP接口) {
  if (!私钥开关 && 验证VL的密钥(new Uint8Array(VL数据.slice(1, 17))) !== 哎呀呀这是我的VL密钥) {
    return null;
  }
  const 获取数据定位 = new Uint8Array(VL数据)[17];
  const 提取端口索引 = 18 + 获取数据定位 + 1;
  const 建立端口缓存 = VL数据.slice(提取端口索引, 提取端口索引 + 2);
  const 访问端口 = new DataView(建立端口缓存).getUint16(0);
  const 提取地址索引 = 提取端口索引 + 2;
  const 建立地址缓存 = new Uint8Array(VL数据.slice(提取地址索引, 提取地址索引 + 1));
  const 识别地址类型 = 建立地址缓存[0];
  let 地址长度 = 0;
  let 访问地址 = '';
  let 地址信息索引 = 提取地址索引 + 1;
  switch (识别地址类型) {
    case 1:
      地址长度 = 4;
      访问地址 = new Uint8Array(VL数据.slice(地址信息索引, 地址信息索引 + 地址长度)).join('.');
      break;
    case 2:
      地址长度 = new Uint8Array(VL数据.slice(地址信息索引, 地址信息索引 + 1))[0];
      地址信息索引 += 1;
      访问地址 = new TextDecoder().decode(VL数据.slice(地址信息索引, 地址信息索引 + 地址长度));
      break;
    case 3:
      地址长度 = 16;
      const dataView = new DataView(VL数据.slice(地址信息索引, 地址信息索引 + 地址长度));
      const ipv6 = [];
      for (let i = 0; i < 8; i++) { ipv6.push(dataView.getUint16(i * 2).toString(16)); }
      访问地址 = ipv6.join(':');
      break;
  }
  const 写入初始数据 = VL数据.slice(地址信息索引 + 地址长度);
  if (启用反代功能 && 启用SOCKS5反代 && 启用SOCKS5全局反代) {
    TCP接口 = await 创建SOCKS5接口(识别地址类型, 访问地址, 访问端口);
    return { TCP接口, 写入初始数据 };
  } else {
    try {
      TCP接口 = connect({ hostname: 访问地址, port: 访问端口 });
      await TCP接口.opened;
    } catch {
      if (启用反代功能) {
        if (启用SOCKS5反代) {
          TCP接口 = await 创建SOCKS5接口(识别地址类型, 访问地址, 访问端口);
        } else {
          let [反代IP地址, 反代IP端口] = 反代IP.split(':');
          TCP接口 = connect({ hostname: 反代IP地址, port: 反代IP端口 || 访问端口 });
        }
      }
    } finally {
      return { TCP接口, 写入初始数据 };
    }
  }
}
function 验证VL的密钥(arr, offset = 0) {
  const uuid = (转换密钥格式[arr[offset + 0]] + 转换密钥格式[arr[offset + 1]] + 转换密钥格式[arr[offset + 2]] + 转换密钥格式[arr[offset + 3]] + "-" + 转换密钥格式[arr[offset + 4]] + 转换密钥格式[arr[offset + 5]] + "-" + 转换密钥格式[arr[offset + 6]] + 转换密钥格式[arr[offset + 7]] + "-" + 转换密钥格式[arr[offset + 8]] + 转换密钥格式[arr[offset + 9]] + "-" + 转换密钥格式[arr[offset + 10]] + 转换密钥格式[arr[offset + 11]] + 转换密钥格式[arr[offset + 12]] + 转换密钥格式[arr[offset + 13]] + 转换密钥格式[arr[offset + 14]] + 转换密钥格式[arr[offset + 15]]).toLowerCase();
  return uuid;
}
const 转换密钥格式 = [];
for (let i = 0; i < 256; ++i) { 转换密钥格式.push((i + 256).toString(16).slice(1)); }

async function 建立传输管道(WS接口, TCP接口, 写入初始数据) {
  let tcpWriter;
  let isWsClosed = false;
  let isTcpClosed = false;

  const closeBoth = (reason) => {
    if (!isWsClosed) {
      isWsClosed = true;
      try {
        WS接口.close();
      } catch (err) {
        console.warn("关闭 WebSocket 时发生错误:", err);
      }
    }
    if (!isTcpClosed) {
      isTcpClosed = true;
      try {
        tcpWriter?.close();
      } catch (err) {
        console.warn("关闭 TCP 写入器时发生错误:", err);
      }
      try {
        TCP接口?.close(); // 尝试关闭整个 TCP 连接
      } catch (err) {
        console.warn("关闭 TCP 连接时发生错误:", err);
      }
    }
    if (reason) {
      console.log("管道关闭原因:", reason);
    }
  };

  try {
    tcpWriter = TCP接口.writable.getWriter();

    // 发送初始 WS 信号
    try {
      await WS接口.send(new Uint8Array([0, 0]).buffer);
    } catch (error) {
      console.error("发送初始 WS 信号失败:", error);
      closeBoth(error);
      return; // 重要：如果初始发送失败，不要继续管道
    }

    // 将 TCP 数据直接管道到 WebSocket
    TCP接口.readable.pipeTo(new WritableStream({
      async write(chunk) {
        try {
          WS接口.send(chunk);
        } catch (err) {
          console.error("TCP to WS 管道写入错误:", err);
          closeBoth(err);
        }
      },
      close() {
        console.log("TCP readable 流已关闭 (TCP to WS)");
        if (!isWsClosed) {
          try {
            WS接口.close();
          } catch (err) {
            console.warn("关闭 WebSocket 时发生错误 (TCP to WS close):", err);
          }
        }
      },
      abort(reason) {
        console.log("TCP to WS 管道中止:", reason);
        closeBoth(reason);
      }
    }), { preventClose: true }).catch(err => { // preventClose 阻止自动关闭 WS
      console.error("TCP to WS 管道错误:", err);
      closeBoth(err);
    });

    // 创建接收 WebSocket 数据的可读流
    const wsToTcpStream = new ReadableStream({
      start(controller) {
        if (写入初始数据) {
          controller.enqueue(写入初始数据);
        }

        WS接口.addEventListener('message', (event) => {
          controller.enqueue(event.data);
        });

        WS接口.addEventListener('close', () => {
          console.log("WebSocket 连接已关闭 (WS to TCP)");
          controller.close();
          closeBoth("WebSocket 连接关闭");
        });

        WS接口.addEventListener('error', (error) => {
          console.error("WebSocket 错误:", error);
          controller.error(error);
          closeBoth(error);
        });
      },
      cancel(reason) {
        console.log("WebSocket 到 TCP 流被取消:", reason);
        closeBoth(reason);
      }
    });

    // 将 WebSocket 数据管道到 TCP
    wsToTcpStream.pipeTo(new WritableStream({
      async write(chunk) {
        if (!tcpWriter) {
          console.error("TCP 写入器未初始化，无法写入数据。");
          return;
        }
        try {
          await tcpWriter.write(chunk);
        } catch (err) {
          console.error("WS to TCP 管道写入错误:", err);
          closeBoth(err);
        }
      },
      close() {
        console.log("WebSocket readable 流已关闭 (WS to TCP)");
        closeBoth("WebSocket readable 流关闭");
      },
      abort(reason) {
        console.log("WS to TCP 管道中止:", reason);
        closeBoth(reason);
      }
    }), { preventClose: true }).catch(err => { // preventClose 阻止自动关闭 TCP
      console.error("WS to TCP 管道错误:", err);
      closeBoth(err);
    });

  } catch (error) {
    console.error("建立传输管道过程中发生错误:", error);
    closeBoth(error);
  }
}

async function 创建SOCKS5接口(识别地址类型, 访问地址, 访问端口) {
  const { username, password, hostname, port } = await 获取SOCKS5账号(我的SOCKS5账号);
  const SOCKS5接口 = connect({ hostname, port });
  try {
    await SOCKS5接口.opened;
  } catch {
    return new Response('SOCKS5未连通', { status: 400 });
  }
  const writer = SOCKS5接口.writable.getWriter();
  const reader = SOCKS5接口.readable.getReader();
  const encoder = new TextEncoder();
  const socksGreeting = new Uint8Array([5, 2, 0, 2]);
  await writer.write(socksGreeting);
  let res = (await reader.read()).value;
  if (res[1] === 0x02) {
    if (!username || !password) {
      return 关闭接口并退出();
    }
    const authRequest = new Uint8Array([1, username.length, ...encoder.encode(username), password.length, ...encoder.encode(password)]);
    await writer.write(authRequest);
    res = (await reader.read()).value;
    if (res[0] !== 0x01 || res[1] !== 0x00) {
      return 关闭接口并退出();
    }
  }
  let 转换访问地址;
  switch (识别地址类型) {
    case 1:
      转换访问地址 = new Uint8Array([1, ...访问地址.split('.').map(Number)]);
      break;
    case 2:
      转换访问地址 = new Uint8Array([3, 访问地址.length, ...encoder.encode(访问地址)]);
      break;
    case 3:
      转换访问地址 = new Uint8Array([4, ...访问地址.split(':').flatMap(x => [parseInt(x.slice(0, 2), 16), parseInt(x.slice(2), 16)])]);
      break;
    default:
      return 关闭接口并退出();
  }
  const socksRequest = new Uint8Array([5, 1, 0, ...转换访问地址, 访问端口 >> 8, 访问端口 & 0xff]);
  await writer.write(socksRequest);
  res = (await reader.read()).value;
  if (res[0] !== 0x05 || res[1] !== 0x00) {
    return 关闭接口并退出();
  }
  writer.releaseLock();
  reader.releaseLock();
  return SOCKS5接口;
  function 关闭接口并退出() {
    writer.releaseLock();
    reader.releaseLock();
    SOCKS5接口.close();
    return new Response('SOCKS5握手失败', { status: 400 });
  }
}
async function 获取SOCKS5账号(SOCKS5) {
  const [latter, former] = SOCKS5.split("@").reverse();
  let username, password, hostname, port;
  if (former) {
    const formers = former.split(":");
    username = formers[0];
    password = formers[1];
  }
  const latters = latter.split(":");
  port = Number(latters.pop());
  hostname = latters.join(":");
  return { username, password, hostname, port };
}

let 转码 = 'vl', 转码2 = 'ess', 符号 = '://', 小猫 = 'cla', 咪 = 'sh', 我的私钥;
if (私钥开关) {
  我的私钥 = `my-key: ${咦这是我的私钥哎}`
} else {
  我的私钥 = ""
}
function 给我订阅页面(哎呀呀这是我的ID啊, hostName) {
    let kvContent = "";
     if(启用KV功能){
     kvContent =  ` 
      <h1>配置 PROXYIP IP</h1>
        <p>当前 PROXYIP IP 地址: <span id="current-proxy-ip-display">加载中...</span></p>
        <form id="proxy-ip-form">
          <label for="proxy-ip-input">PROXYIP IP 地址和端口 (例如: ts.hpc.tw:443):</label><br>
          <input type="text" id="proxy-ip-input" name="proxyip" required><br><br>
          <button type="submit">更新 PROXYIP IP</button>
        </form>
        <h1>配置 优选反代 IP TXT地址</h1>
      <p>当前 优选TXT 地址 (逗号分隔): <span id="current-txt-urls-display">加载中...</span></p>
        <form id="txt-urls-form">
          <label for="txt-urls-input">新的 优选TXT 文件地址 (多个地址请使用英文逗号 , 分割):</label><br>
          <input type="text" id="txt-urls-input" name="txturls" required><br><br>
          <button type="submit">更新 优选TXT</button>
      </form>
     <script>
     async function fetchCurrentProxyIP() {
        try {
          const response = await fetch('/get-proxy-ip');
          if (response.ok) {
            const data = await response.text();
            document.getElementById('current-proxy-ip-display').textContent = data || '未设置';
          } else {
            document.getElementById('current-proxy-ip-display').textContent = '加载失败';
          }
        } catch (error) {
          console.error("获取 PROXYIP IP 失败:", error);
          document.getElementById('current-proxy-ip-display').textContent = '加载失败';
        }
      }
    async function fetchCurrentTXTUrls() {
        try{
          const txtUrls = await  fetch('/set-txt-urls', {method:'GET'})
                if (txtUrls.ok) {
                    const data = await  txtUrls.text()
                      document.getElementById('current-txt-urls-display').textContent = data ||'未设置';
                  }
                 else {
                   document.getElementById('current-txt-urls-display').textContent ='加载失败';
                 }
          } catch (error){
             document.getElementById('current-txt-urls-display').textContent ='加载失败';
             console.error("获取TXT列表失败", error);
          }
       }
   
       document.addEventListener('DOMContentLoaded', ()=>{fetchCurrentProxyIP(); fetchCurrentTXTUrls();});
   
     
       document.getElementById('proxy-ip-form').addEventListener('submit', async (event) => {
         event.preventDefault();
         const proxyIpInput = document.getElementById('proxy-ip-input').value;
         try {
           const response = await fetch('/set-proxy-ip', {
             method: 'POST',
             body: proxyIpInput,
           });
   
           if (response.ok) {
             alert('PROXYIP IP 已成功更新为: ' + proxyIpInput);
              fetchCurrentProxyIP(); // 刷新显示
           } else {
             alert('更新PROXYIP IP 失败.');
           }
         } catch (error) {
           console.error('更新 PROXYIP IP 出错:', error);
           alert('更新 PROXYIP IP 时发生错误.');
         }
       });
        document.getElementById('txt-urls-form').addEventListener('submit', async (event) => {
           event.preventDefault();
            const txtUrlsInput = document.getElementById('txt-urls-input').value;
           try{
              const  response = await fetch('/set-txt-urls',{
                  method : 'POST',
                  body: txtUrlsInput,
              })
               if(response.ok){
                  alert('TXT URLs 更新为:' + txtUrlsInput);
                   fetchCurrentTXTUrls(); //刷新
             }else {
                 alert('更新 TXT URLs 失败');
              }
           } catch(error) {
             console.error('更新TXT URLs失败',error);
                alert('更新TXT URLs发生错误');
          }
       })
     </script>`
    }
    return `
      ${kvContent}
      <hr>

      <p>1、本worker的私钥功能只支持${小猫}${咪}，仅open${小猫}${咪}和${小猫}${咪} meta测试过，其他${小猫}${咪}类软件自行测试</p>
      <p>2、若使用通用订阅请关闭私钥功能</p>
      <p>3、由粑屁魔改天书8.0</p>

      <p>通用的：<a href="https${符号}${hostName}/${哎呀呀这是我的ID啊}/${转码}${转码2}">https${符号}${hostName}/${哎呀呀这是我的ID啊}/${转码}${转码2}</a></p>
      <p>猫咪的：<a href="https${符号}${hostName}/${哎呀呀这是我的ID啊}/${小猫}${咪}">https${符号}${hostName}/${哎呀呀这是我的ID啊}/${小猫}${咪}</a></p>
  `;
}
function 给我通用配置文件(hostName) {
  if (我的优选.length === 0) {
    我的优选 = [`${hostName}:443`];
  }
  if (私钥开关) {
    return `请先关闭私钥功能`;
  } else {
    return 我的优选.map(获取优选 => {
      const [主内容, tls] = 获取优选.split("@");
      const [地址端口, 节点名字 = 我的节点名字] = 主内容.split("#");
      const 拆分地址端口 = 地址端口.split(":");
      const 端口 = 拆分地址端口.length > 1 ? Number(拆分地址端口.pop()) : 443;
      const 地址 = 拆分地址端口.join(":");
      const TLS开关 = tls === 'notls' ? 'security=none' : 'security=tls';
      return `${转码}${转码2}${符号}${哎呀呀这是我的VL密钥}@${地址}:${端口}?encryption=none&${TLS开关}&sni=${hostName}&type=ws&host=${hostName}&path=%2F%3Fed%3D2560#${节点名字}`;
    }).join("\n");
  }
}
function 给我小猫咪配置文件(hostName) {
  if (我的优选.length === 0) {
    我的优选 = [`${hostName}:443`];
  }
  const 生成节点 = (我的优选) => {
    return 我的优选.map(获取优选 => {
      const [主内容, tls] = 获取优选.split("@");
      const [地址端口, 节点名字 = 我的节点名字] = 主内容.split("#");
      const 拆分地址端口 = 地址端口.split(":");
      const 端口 = 拆分地址端口.length > 1 ? Number(拆分地址端口.pop()) : 443;
      const 地址 = 拆分地址端口.join(":").replace(/^\[(.+)\]$/, '$1');
      const TLS开关 = tls === 'notls' ? 'false' : 'true';
      return {
        nodeConfig: `- name: ${节点名字}-${地址}-${端口}
  type: ${转码}${转码2}
  server: ${地址}
  port: ${端口}
  uuid: ${哎呀呀这是我的VL密钥}
  udp: false
  tls: ${TLS开关}
  sni: ${hostName}
  network: ws
  ws-opts:
    path: "/?ed=2560"
    headers:
      Host: ${hostName}
      ${我的私钥}`,
        proxyConfig: `    - ${节点名字}-${地址}-${端口}`
      };
    });
  };
  const 节点配置 = 生成节点(我的优选).map(node => node.nodeConfig).join("\n");
  const 代理配置 = 生成节点(我的优选).map(node => node.proxyConfig).join("\n");
  return `
proxies:
${节点配置}
proxy-groups:
- name: ⚡ 低延迟
  type: url-test
  url: http://www.gstatic.com/generate_204
  interval: 60
  tolerance: 30
  proxies:
${代理配置}
- name: ✈️ 手动
  type: select
  proxies:
    - ⚡ 低延迟
    - DIRECT
${代理配置}
- name: 🐟 漏网之鱼
  type: select
  proxies:
    - ✈️ 手动
    - DIRECT

rules:
  - GEOSITE,category-ads-all,REJECT
  - GEOSITE,cloudflare,⚡ 低延迟,no-resolve
  - GEOIP,cloudflare,⚡ 低延迟,no-resolve
  - GEOSITE,icloud@cn,DIRECT,no-resolve
  - GEOSITE,apple@cn,DIRECT,no-resolve
  - GEOSITE,cn,DIRECT,no-resolve
  - GEOSITE,apple-cn,DIRECT,no-resolve
  - GEOSITE,microsoft@cn,DIRECT
  - GEOIP,CN,DIRECT,no-resolve
  - GEOIP,private,DIRECT,no-resolve
  - MATCH, 🐟 漏网之鱼
`;
}