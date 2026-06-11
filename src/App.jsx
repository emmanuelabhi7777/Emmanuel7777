import { useState, useEffect, useCallback } from "react";

const REP_PINS = {
  "J.Bell":"1","Jose":"2","J.Livelli":"3","Heather":"4","OmerP":"5",
  "Todd":"6","Josh":"7","Shannon":"8","Eric":"9","Halil":"10","House":"0"
};
const REPS = Object.keys(REP_PINS);
const YEARS = ["2025","2026","2027"];
const YEAR_MONTHS = [
  {key:"Jan",label:"January"},{key:"Feb",label:"February"},{key:"Mar",label:"March"},
  {key:"Apr",label:"April"},{key:"May",label:"May"},{key:"Jun",label:"June"},
  {key:"Jul",label:"July"},{key:"Aug",label:"August"},{key:"Sep",label:"September"},
  {key:"Oct",label:"October"},{key:"Nov",label:"November"},{key:"Dec",label:"December"},
];
const MANAGER_PIN = "mgr2025";
const STORAGE_KEY = "dist_forecast_v5";

const DEFAULT_DISTRIBUTORS = [
  {
    name:"DOT", label:"DOT Foods",
    customers:["AWG","Albertsons","Amcon","CVS","Capitol Distributing","Cooper Booth","Core-Mark",
      "Crossroads","Dot Foods","Fareway","GSC","Harbor Foods","Harris Teeter","Henry's Foods",
      "Hy-Vee","Kroger","Midwest Food & Tobacco","SAS","Stewart","Vicksburg Specialty","Vistar","Winn Dixie"],
    products:[
      {sku:"NG-7656",desc:"Key Lime Pretzels 12/7 oz"},
      {sku:"CVS-372992",desc:"WM Organic Dark Chocolate Cherry Trail Mix 12/6 oz"},
      {sku:"CVS-351142",desc:"Heart Healthy Snack Mix 12/5 oz"},
      {sku:"CVS-385681",desc:"WM Keto Snack Mix 12/5 oz"},
      {sku:"CVS-304784",desc:"WM Keto Dark Chocolate Coconut Trail Mix 12/6 oz"},
      {sku:"CVS-481296",desc:"WM Greek Yogurt Coated Almonds 12/6.5 oz"},
      {sku:"CVS-516714",desc:"WM Keto Dark Chocolate Coconut Trail Mix 24/3 oz"},
      {sku:"CVS-228046",desc:"WM Fruit and Nut Trail Mix 12/8 oz"},
      {sku:"NG-8535",desc:"Probiotic Yoggie Bites Strawberry 12x 7/0.7 oz"},
      {sku:"NG-8536",desc:"Probiotic Mixed Berry Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8656",desc:"Probiotic Yoggie Bites Strawberry 12/2 oz"},
      {sku:"NG-8657",desc:"Probiotic Yoggie Bites Mixed Berry 12/2 oz"},
      {sku:"NG-8653",desc:"Probiotic Lemon Berry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8671",desc:"NG Probiotic Strawberry Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8672",desc:"NG Probiotic Mixed Berry Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8325",desc:"Probiotic Strawberry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8326",desc:"Probiotic Mixed Berry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8346",desc:"Probiotic Mango Peach Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8361",desc:"Probiotic Tropical Yoggies 6x 12/.7oz"},
      {sku:"NG-8347",desc:"Probiotic Lemonberry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8342",desc:"Probiotic Strawberry Yoggie Trail Mix 6x 10/1 oz"},
      {sku:"NG-8343",desc:"Probiotic Mixed Berry Yoggies Trail Mix 6x 10/1 oz"},
      {sku:"NG-8340",desc:"Probiotic Strawberry Yoggies Trail Mix 12/8 oz"},
      {sku:"NG-8341",desc:"Probiotic Mixed Berry Yoggies Trail Mix 12/8 oz"},
      {sku:"NG-8103",desc:"Yoggies Strawberry 1.8oz"},{sku:"NG-8104",desc:"Yoggies Mixed Berry 1.8oz"},
      {sku:"NG-8115",desc:"Yoggies Strawberry Trail Mix 1.8oz"},{sku:"NG-8116",desc:"Yoggies Mixed Berry Trail Mix 1.8oz"},
      {sku:"NG-8133",desc:"Yoggies Strawberry 2oz"},{sku:"NG-8134",desc:"Yoggies Mixed Berry 2oz"},
      {sku:"NG-8166",desc:"Yoggies Strawberry .7oz 100ct"},{sku:"NG-8167",desc:"Yoggies Mixed Berry .7oz 100ct"},
      {sku:"NG-8169",desc:"Yoggies Dump Bins"},
      {sku:"NG-8269",desc:"NG Probiotic Strawberry Yoggies 6x 5/0.7 oz"},{sku:"NG-8270",desc:"NG Probiotic Mixed Berry Yoggies 6x 5/0.7 oz"},
      {sku:"NG-8293",desc:"Probiotic Mango Peach Yoggies 12x (DRC)"},{sku:"NG-8310",desc:"Probiotic Mango Peach Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8239",desc:"Raspberry Fruichia 6x 8/0.7 oz"},{sku:"NG-8240",desc:"Strawberry Fruichia 6x 8/0.7 oz"},
      {sku:"NG-8378",desc:"Yoggie Shipper 12 carton box 50x 12/0.7 oz"},
      {sku:"NG-8429",desc:"Probiotic Yoggies Halloween Variety MP 6x 12/0.7 oz"},
      {sku:"NG-8489",desc:"Probiotic Yoggies Christmas Variety Snack Pack 6x 12/0.7 oz"},
      {sku:"NG-8494",desc:"Probiotic Yoggies Christmas Variety Shipper 35x 12/0.7 oz"},
      {sku:"NG-8533",desc:"Probiotic Yoggies New Shipper"},{sku:"NG-8534",desc:"Yoggies Trail Mix Shipper 500"},
    ]
  },
  {
    name:"KEHE", label:"KEHE",
    customers:["Save Mart","Sprouts","Stater Bros"],
    products:[
      {sku:"NG-8325",desc:"Probiotic Strawberry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8326",desc:"Probiotic Mixed Berry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8342",desc:"Probiotic Strawberry Yoggie Trail Mix 6x 10/1 oz"},
      {sku:"NG-8343",desc:"Probiotic Mixed Berry Yoggies Trail Mix 6x 10/1 oz"},
      {sku:"NG-8249",desc:"Probiotic Strawberry Yoggies 1.8oz"},
      {sku:"NG-8250",desc:"Probiotic Mixed Berry Yoggies 1.8oz"},
      {sku:"NG-8361",desc:"Probiotic Tropical Yoggies 6x 12/.7oz"},
    ]
  },
  {
    name:"TOPS", label:"C&S / TOPS",
    customers:["Tops","Winn Dixie","Price Chopper"],
    products:[
      {sku:"NG-7025",desc:"Multi Pack - Omega-3 Deluxe Mix 6x 7/1.2 oz"},
      {sku:"GEN-DRF2005",desc:"Banana Chips 12/5 oz"},{sku:"GEN-DRF2012",desc:"Pitted Dates 12/10 oz"},
      {sku:"GEN-DRF2015",desc:"Ginger Crystallized 12/8 oz"},{sku:"GEN-DRF2018",desc:"Mango Slices 12/7.5 oz"},
      {sku:"GEN-DRF2020",desc:"Papaya Chunks 12/9 oz"},{sku:"GEN-DRF2023",desc:"Pineapple Chunks 12/9 oz"},
      {sku:"GEN-DRF2025",desc:"Pitted Prunes 12/12 oz"},{sku:"GEN-DRF2036",desc:"Kiwi 12/9 oz"},
      {sku:"GEN-DRF2052",desc:"Cranberries 12/10 oz"},{sku:"GEN-GRN2427",desc:"Green Split Peas 12/11 oz"},
      {sku:"GEN-LTUB5046",desc:"Plantain Chips 12/10 oz"},{sku:"GEN-MIX2237",desc:"Green Peas Wasabi 12/6.5 oz"},
      {sku:"NG-8535",desc:"Probiotic Yoggie Bites Strawberry 12x 7/0.7 oz"},
      {sku:"NG-8536",desc:"Probiotic Mixed Berry Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8653",desc:"Probiotic Lemon Berry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8325",desc:"Probiotic Strawberry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8326",desc:"Probiotic Mixed Berry Yoggies 6x 12/0.7 oz"},
      {sku:"NG-8340",desc:"Probiotic Strawberry Yoggies Trail Mix 12/8 oz"},
      {sku:"NG-8341",desc:"Probiotic Mixed Berry Yoggies Trail Mix 12/8 oz"},
      {sku:"NG-8310",desc:"Probiotic Mango Peach Yoggies 12x 7/0.7 oz"},
      {sku:"NG-8166",desc:"Probiotic Yoggie Bites Strawberry 100/0.7 oz"},
      {sku:"NG-8167",desc:"Probiotic Yoggie Mixed Berry 100/0.7 oz"},
    ]
  },
];

// ── Supabase ──────────────────────────────────────────────────────────────────
function getSB(){
  const url=window.SUPABASE_URL, key=window.SUPABASE_KEY;
  if(!url||!key||url==="YOUR_SUPABASE_URL") return null;
  return {url,key};
}
async function sbFetch(path,opts={}){
  const sb=getSB(); if(!sb) return null;
  try{
    const r=await fetch(`${sb.url}/rest/v1/${path}`,{
      headers:{"apikey":sb.key,"Authorization":`Bearer ${sb.key}`,"Content-Type":"application/json","Prefer":"resolution=merge-duplicates",...(opts.headers||{})},
      ...opts
    });
    if(!r.ok) return null;
    const t=r.status===204?"":await r.text();
    return t?JSON.parse(t):[];
  }catch(e){console.error(e);return null;}
}

async function loadAll(){
  const sb=getSB();
  if(!sb){
    try{
      const f=localStorage.getItem(STORAGE_KEY);
      const c=localStorage.getItem(STORAGE_KEY+"_customers");
      const p=localStorage.getItem(STORAGE_KEY+"_products");
      return {forecasts:f?JSON.parse(f):{},extraCustomers:c?JSON.parse(c):{},extraProducts:p?JSON.parse(p):{}};
    }catch{return {forecasts:{},extraCustomers:{},extraProducts:{}};}
  }
  try{
    const [fRows,cRows,pRows]=await Promise.all([
      sbFetch("forecasts?select=*"),
      sbFetch("extra_customers?select=*"),
      sbFetch("extra_products?select=*"),
    ]);
    const forecasts={};
    (fRows||[]).forEach(r=>{try{forecasts[r.cell_key]=JSON.parse(r.cell_data);}catch{}});
    const extraCustomers={};
    (cRows||[]).forEach(r=>{try{extraCustomers[r.dist]=JSON.parse(r.customers);}catch{}});
    const extraProducts={};
    (pRows||[]).forEach(r=>{try{extraProducts[r.dist]=JSON.parse(r.products);}catch{}});
    return {forecasts,extraCustomers,extraProducts};
  }catch{return {forecasts:{},extraCustomers:{},extraProducts:{}};}
}

async function saveSingleForecast(cellKey,cellData,prevData){
  const sb=getSB();
  if(!sb){try{const f=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");f[cellKey]=cellData;localStorage.setItem(STORAGE_KEY,JSON.stringify(f));}catch{}return;}
  await sbFetch("forecasts",{method:"POST",body:JSON.stringify([{cell_key:cellKey,cell_data:JSON.stringify(cellData)}])});
  saveHistoryEntry(cellKey,cellData,prevData); // fire and forget
}
async function deleteForecast(cellKey,prevData){
  const sb=getSB();
  if(!sb){try{const f=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");delete f[cellKey];localStorage.setItem(STORAGE_KEY,JSON.stringify(f));}catch{}return;}
  await sbFetch(`forecasts?cell_key=eq.${encodeURIComponent(cellKey)}`,{method:"DELETE"});
  saveDeleteHistory(cellKey,prevData); // fire and forget
}
async function saveHistoryEntry(cellKey,cellData,prevData){
  const sb=getSB(); if(!sb) return;
  const parts=cellKey.split("||");
  const fc=calcForecastRaw(cellData);
  const prevFc=calcForecastRaw(prevData);
  const entry={
    cell_key:cellKey,
    dist:parts[0],customer:parts[1],sku:parts[2],year:parts[3],month:parts[4],
    rep:cellData.rep||"",
    total_cases:fc?.total||0,
    prev_cases:prevFc?.total||0,
    cell_data:JSON.stringify(cellData),
    action:"save",
    created_at:new Date().toISOString()
  };
  await sbFetch("forecast_history",{method:"POST",headers:{"Prefer":""},body:JSON.stringify([entry])}); 
}
async function saveDeleteHistory(cellKey,prevData){
  const sb=getSB(); if(!sb) return;
  const parts=cellKey.split("||");
  const prevFc=calcForecastRaw(prevData);
  const entry={
    cell_key:cellKey,
    dist:parts[0],customer:parts[1],sku:parts[2],year:parts[3],month:parts[4],
    rep:prevData?.rep||"",
    total_cases:0,prev_cases:prevFc?.total||0,
    cell_data:JSON.stringify({}),
    action:"delete",
    created_at:new Date().toISOString()
  };
  await sbFetch("forecast_history",{method:"POST",headers:{"Prefer":""},body:JSON.stringify([entry])});
}
async function loadHistory(cellKey){
  const sb=getSB(); if(!sb) return [];
  const rows=await sbFetch(`forecast_history?cell_key=eq.${encodeURIComponent(cellKey)}&order=created_at.desc&limit=20`);
  return rows||[];
}
async function loadAllHistory(dist,year){
  const sb=getSB(); if(!sb) return [];
  const rows=await sbFetch(`forecast_history?dist=eq.${encodeURIComponent(dist)}&year=eq.${encodeURIComponent(year)}&order=created_at.desc&limit=100`);
  return rows||[];
}
// raw calc without circular dep
function calcForecastRaw(cell){
  if(!cell) return null;
  const vel=parseFloat(cell.velocity)||0,stores=parseInt(cell.stores)||0,weeks=parseFloat(cell.weeks)||0;
  const upc=parseFloat(cell.unitsPerCase)||1,base=Math.round(vel*stores*weeks/upc);
  const manual=parseInt(cell.manualQty)||0,useManual=cell.useManual&&manual>0,baseQty=useManual?manual:base;
  const liftPct=parseFloat(cell.liftPct)||0,liftFlat=parseInt(cell.liftFlat)||0;
  const liftUnits=Math.round(baseQty*(liftPct/100)),total=baseQty+liftUnits+liftFlat;
  return {total};
}

async function saveExtraCustomers(d){
  const sb=getSB();
  if(!sb){try{localStorage.setItem(STORAGE_KEY+"_customers",JSON.stringify(d));}catch{}return;}
  const rows=Object.entries(d).map(([k,v])=>({dist:k,customers:JSON.stringify(v)}));
  if(rows.length) await sbFetch("extra_customers",{method:"POST",body:JSON.stringify(rows)});
}
async function saveExtraProducts(d){
  const sb=getSB();
  if(!sb){try{localStorage.setItem(STORAGE_KEY+"_products",JSON.stringify(d));}catch{}return;}
  const rows=Object.entries(d).map(([k,v])=>({dist:k,products:JSON.stringify(v)}));
  if(rows.length) await sbFetch("extra_products",{method:"POST",body:JSON.stringify(rows)});
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function weeksInMonth(monthKey,year){
  const d=new Date(`${monthKey} 1 ${year}`);
  return parseFloat((new Date(d.getFullYear(),d.getMonth()+1,0).getDate()/7).toFixed(2));
}
function calcForecast(cell){
  if(!cell) return null;
  const vel=parseFloat(cell.velocity)||0,stores=parseInt(cell.stores)||0,weeks=parseFloat(cell.weeks)||0;
  const upc=parseFloat(cell.unitsPerCase)||1,rawUnits=vel*stores*weeks,base=Math.round(rawUnits/upc);
  const manual=parseInt(cell.manualQty)||0,useManual=cell.useManual&&manual>0,baseQty=useManual?manual:base;
  const liftPct=parseFloat(cell.liftPct)||0,liftFlat=parseInt(cell.liftFlat)||0;
  const liftUnits=Math.round(baseQty*(liftPct/100)),total=baseQty+liftUnits+liftFlat;
  return {base:baseQty,liftUnits,liftFlat,total,liftPct,stores,vel,weeks,upc,rawUnits:Math.round(rawUnits),useManual,manual};
}
function getInheritedStores(forecasts,dist,sku,customer,year,monthKey){
  const idx=YEAR_MONTHS.findIndex(m=>m.key===monthKey);
  for(let i=idx-1;i>=0;i--){
    const k=`${dist}||${customer}||${sku}||${year}||${YEAR_MONTHS[i].key}`;
    if(forecasts[k]?.stores) return {stores:forecasts[k].stores,fromMonth:YEAR_MONTHS[i].key};
  }
  return null;
}
function exportCSV(forecasts,distributors,year,distName){
  const months=YEAR_MONTHS.map(m=>m.key);
  const distList=distName?distributors.filter(d=>d.name===distName):distributors;
  const rows=[["Distributor","Customer","SKU","Description","Rep",...months.flatMap(m=>[`${m} Total`,`${m} Base`,`${m} Stores`,`${m} Vel`,`${m} Weeks`,`${m} UPC`,`${m} Promo%`,`${m} PromoFlat`,`${m} Conf`,`${m} Notes`])]];
  distList.forEach(dist=>{
    const allC=new Set();
    Object.keys(forecasts).forEach(k=>{if(k.startsWith(dist.name+"||")){const[,c]=k.split("||");allC.add(c);}});
    allC.forEach(customer=>{
      dist.products.forEach(prod=>{
        const hasData=months.some(m=>forecasts[`${dist.name}||${customer}||${prod.sku}||${year}||${m}`]);
        if(!hasData) return;
        const row=[dist.label,customer,prod.sku,prod.desc,""];
        months.forEach(m=>{
          const cell=forecasts[`${dist.name}||${customer}||${prod.sku}||${year}||${m}`];
          const fc=calcForecast(cell);
          row.push(fc?fc.total:"",fc?fc.base:"",cell?.stores||"",cell?.velocity||"",cell?.weeks||"",cell?.unitsPerCase||"",cell?.liftPct||"",cell?.liftFlat||"",cell?.conf||"",(cell?.notes||"").replace(/,/g,""));
        });
        rows.push(row);
      });
    });
  });
  const csv=rows.map(r=>r.join(",")).join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=`forecast_${distName||"all"}_${year}.csv`;a.click();URL.revokeObjectURL(url);
}

const CONF_OPTS=["","Low","Medium","High"];
const CS={Low:{bg:"#FEF2F2",c:"#991B1B"},Medium:{bg:"#FFFBEB",c:"#92400E"},High:{bg:"#F0FDF4",c:"#166534"}};
const TH={padding:"7px 10px",fontWeight:600,color:"#374151",borderBottom:"2px solid #D1D5DB",whiteSpace:"nowrap",fontSize:12};
const TD={padding:"5px 8px",color:"#374151",borderBottom:"1px solid #F3F4F6",fontSize:12,verticalAlign:"top"};

// ── Planning Panel ────────────────────────────────────────────────────────────
function PlanningPanel({dist,customer,sku,monthKey,year,forecasts,onSave,onDelete,onClose,repName}){
  const cellKey=`${dist}||${customer}||${sku}||${year}||${monthKey}`;
  const ex=forecasts[cellKey]||{};
  const wks=weeksInMonth(monthKey,year);
  const inherited=getInheritedStores(forecasts,dist,sku,customer,year,monthKey);
  const [d,setD]=useState({
    velocity:ex.velocity||"",stores:ex.stores||(inherited?.stores||""),
    weeks:ex.weeks||wks.toFixed(1),unitsPerCase:ex.unitsPerCase||"",
    liftPct:ex.liftPct||"",liftFlat:ex.liftFlat||"",
    isReset:ex.isReset||false,conf:ex.conf||"",notes:ex.notes||"",
    useManual:ex.useManual||false,manualQty:ex.manualQty||"",
  });
  const [saving,setSaving]=useState(false);
  const [confirmDelete,setConfirmDelete]=useState(false);
  const fc=calcForecast({...d});
  const storesInherited=!ex.stores&&inherited&&!d.isReset;
  const month=YEAR_MONTHS.find(m=>m.key===monthKey);
  const hasExisting=!!forecasts[cellKey];

  async function handleSave(){
    setSaving(true);
    await onSave(cellKey,{...d,rep:repName,updatedAt:new Date().toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})});
    setSaving(false);onClose();
  }
  async function handleDelete(){
    setSaving(true);
    await onDelete(cellKey);
    setSaving(false);onClose();
  }

  return(
    <div style={{position:"fixed",zIndex:999,top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{background:"#fff",border:"1.5px solid #3B82F6",borderRadius:10,padding:14,width:"100%",maxWidth:360,boxShadow:"0 8px 30px rgba(0,0,0,0.2)",maxHeight:"90vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
        <div>
          <div style={{fontSize:13,fontWeight:600,color:"#1D4ED8"}}>{month?.label} {year}</div>
          <div style={{fontSize:11,color:"#9CA3AF"}}>{customer} · {sku}</div>
        </div>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:"#9CA3AF",padding:"0 4px"}}>×</button>
      </div>

      <label style={{display:"flex",alignItems:"center",gap:6,marginBottom:10,cursor:"pointer",background:"#F9FAFB",borderRadius:6,padding:"6px 8px"}}>
        <input type="checkbox" checked={d.useManual} onChange={e=>setD(p=>({...p,useManual:e.target.checked}))} style={{accentColor:"#6366F1",width:14,height:14}}/>
        <span style={{fontSize:12,color:"#374151",fontWeight:500}}>Enter units directly (no velocity calc)</span>
      </label>

      {d.useManual?(
        <div style={{background:"#EEF2FF",border:"1px solid #C7D2FE",borderRadius:7,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontSize:11,color:"#4338CA",fontWeight:600,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em"}}>Manual quantity</div>
          <input type="number" value={d.manualQty} placeholder="Enter total cases"
            onChange={e=>setD(p=>({...p,manualQty:e.target.value}))}
            style={{width:"100%",border:"1px solid #C7D2FE",borderRadius:5,padding:"7px 10px",fontSize:14,fontWeight:600,boxSizing:"border-box"}}/>
        </div>
      ):(
        <div style={{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:7,padding:"10px 12px",marginBottom:10}}>
          <div style={{fontSize:11,color:"#0369A1",fontWeight:600,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.05em"}}>Base velocity</div>
          <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:8}}>
            {[["Units/store/wk","velocity","e.g. 2.5"],["Stores","stores",inherited?.stores||""],["Weeks","weeks","4.3"],["Units/case","unitsPerCase","e.g. 12"]].map(([label,field,ph])=>(
              <div key={field} style={{display:"flex",flexDirection:"column",gap:3}}>
                <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>
                  {label}{field==="stores"&&storesInherited&&<span style={{color:"#F59E0B",fontSize:10}}> ↳{inherited.fromMonth}</span>}
                </label>
                <input type="number" value={d[field]} placeholder={ph}
                  onChange={e=>setD(p=>({...p,[field]:e.target.value}))}
                  style={{border:`1px solid ${field==="stores"&&storesInherited?"#FCD34D":"#BAE6FD"}`,borderRadius:5,padding:"5px 7px",fontSize:13,width:"100%",boxSizing:"border-box",background:field==="stores"&&storesInherited?"#FFFBEB":"#fff"}}/>
              </div>
            ))}
          </div>
          {(d.velocity||d.stores||d.weeks)&&(
            <div style={{marginTop:8,fontSize:11,background:"#E0F2FE",borderRadius:5,padding:"5px 8px",fontFamily:"monospace",color:"#374151"}}>
              {d.velocity||"?"} × {d.stores||(inherited?.stores||"?")} × {d.weeks||"?"} = {fc?fc.rawUnits.toLocaleString():"—"} units
              {d.unitsPerCase&&<> ÷ {d.unitsPerCase} = <strong>{fc?fc.base.toLocaleString():"—"} cases</strong></>}
              {!d.unitsPerCase&&fc&&<> = <strong>{fc.base.toLocaleString()}</strong> <span style={{color:"#9CA3AF"}}>(add units/case)</span></>}
            </div>
          )}
          <label style={{display:"flex",alignItems:"center",gap:6,marginTop:8,cursor:"pointer"}}>
            <input type="checkbox" checked={d.isReset} onChange={e=>setD(p=>({...p,isReset:e.target.checked}))} style={{accentColor:"#F59E0B",width:14,height:14}}/>
            <span style={{fontSize:11,color:"#92400E",fontWeight:500}}>Reset month — new store count takes effect here</span>
          </label>
          {d.isReset&&d.stores&&<div style={{marginTop:5,fontSize:11,background:"#FFFBEB",border:"1px solid #FCD34D",borderRadius:5,padding:"5px 8px",color:"#92400E"}}>{d.stores} stores carries forward until next reset</div>}
        </div>
      )}

      <div style={{background:"#FDF4FF",border:"1px solid #E9D5FF",borderRadius:7,padding:"10px 12px",marginBottom:10}}>
        <div style={{fontSize:11,color:"#7C3AED",fontWeight:600,marginBottom:6,textTransform:"uppercase",letterSpacing:"0.05em"}}>Promotional lift</div>
        <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:8}}>
          {[["Lift %","liftPct","e.g. 30"],["Flat units","liftFlat","e.g. 500"]].map(([label,field,ph])=>(
            <div key={field} style={{display:"flex",flexDirection:"column",gap:3}}>
              <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>{label}</label>
              <input type="number" value={d[field]} placeholder={ph}
                onChange={e=>setD(p=>({...p,[field]:e.target.value}))}
                style={{border:"1px solid #E9D5FF",borderRadius:5,padding:"5px 7px",fontSize:13,width:"100%",boxSizing:"border-box"}}/>
            </div>
          ))}
        </div>
        {fc&&(fc.liftUnits>0||fc.liftFlat>0)&&(
          <div style={{marginTop:6,fontSize:11,background:"#F3E8FF",borderRadius:5,padding:"5px 8px",fontFamily:"monospace",color:"#374151"}}>
            {fc.base.toLocaleString()} {fc.liftUnits>0&&<>+ {fc.liftPct}% ({fc.liftUnits.toLocaleString()})</>} {fc.liftFlat>0&&<>+ {fc.liftFlat.toLocaleString()}</>} = <strong>{fc.total.toLocaleString()}</strong>
          </div>
        )}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,1fr)",gap:8,marginBottom:12}}>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Confidence</label>
          <select value={d.conf} onChange={e=>setD(p=>({...p,conf:e.target.value}))}
            style={{border:"1px solid #D1D5DB",borderRadius:5,padding:"5px 8px",fontSize:13,background:d.conf&&CS[d.conf]?CS[d.conf].bg:"#fff",color:d.conf&&CS[d.conf]?CS[d.conf].c:"#374151",width:"100%",boxSizing:"border-box"}}>
            {CONF_OPTS.map(o=><option key={o} value={o}>{o||"Select…"}</option>)}
          </select>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:3}}>
          <label style={{fontSize:11,color:"#6B7280",fontWeight:500}}>Notes</label>
          <input type="text" value={d.notes} placeholder="Optional"
            onChange={e=>setD(p=>({...p,notes:e.target.value}))}
            style={{border:"1px solid #D1D5DB",borderRadius:5,padding:"5px 8px",fontSize:13,width:"100%",boxSizing:"border-box"}}/>
        </div>
      </div>

      <div style={{borderTop:"1px solid #F3F4F6",paddingTop:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <span style={{fontSize:12,color:"#6B7280"}}>Total: </span>
            <strong style={{fontSize:18,color:fc?.total>0?"#166534":"#9CA3AF"}}>{fc?fc.total.toLocaleString():"—"}</strong>
            <span style={{fontSize:11,color:"#9CA3AF"}}> cases</span>
          </div>
          <div style={{display:"flex",gap:8}}>
            {hasExisting&&!confirmDelete&&(
              <button onClick={()=>setConfirmDelete(true)}
                style={{background:"none",border:"1px solid #FCA5A5",color:"#DC2626",borderRadius:6,padding:"7px 12px",fontSize:12,cursor:"pointer"}}>
                Clear
              </button>
            )}
            <button onClick={handleSave} disabled={saving}
              style={{background:"#166534",color:"#fff",border:"none",borderRadius:6,padding:"7px 20px",fontSize:13,fontWeight:500,cursor:"pointer",opacity:saving?0.7:1}}>
              {saving?"Saving…":"Save"}
            </button>
          </div>
        </div>
        {confirmDelete&&(
          <div style={{marginTop:10,background:"#FEF2F2",border:"1px solid #FCA5A5",borderRadius:6,padding:"10px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:"#DC2626"}}>Clear this forecast entry?</span>
            <div style={{display:"flex",gap:6}}>
              <button onClick={()=>setConfirmDelete(false)} style={{background:"none",border:"1px solid #D1D5DB",borderRadius:5,padding:"4px 10px",fontSize:12,cursor:"pointer"}}>Cancel</button>
              <button onClick={handleDelete} disabled={saving}
                style={{background:"#DC2626",color:"#fff",border:"none",borderRadius:5,padding:"4px 12px",fontSize:12,cursor:"pointer"}}>Yes, clear it</button>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

function CellDisplay({cell,inherited}){
  const fc=calcForecast(cell);
  const storesInherited=!cell?.stores&&inherited;
  if(!fc||fc.total===0) return <span style={{color:"#D1D5DB",fontSize:11}}>—</span>;
  const hasPromo=fc.liftUnits>0||fc.liftFlat>0;
  return(
    <div>
      <div style={{fontWeight:700,fontSize:13}}>{fc.total.toLocaleString()}</div>
      <div style={{fontSize:10,color:"#9CA3AF",marginTop:1}}>
        {fc.useManual?<span style={{color:"#6366F1"}}>manual</span>:<>{fc.base.toLocaleString()} base</>}
        {hasPromo&&<span style={{color:"#7C3AED"}}> +{(fc.liftUnits+fc.liftFlat).toLocaleString()} promo</span>}
      </div>
      {!fc.useManual&&(cell?.stores||storesInherited)&&(
        <div style={{fontSize:10,color:storesInherited?"#D97706":"#9CA3AF",marginTop:1}}>
          {storesInherited?"↳":""}{cell?.stores||inherited?.stores} stores
          {cell?.isReset&&<span style={{marginLeft:3,background:"#FEF3C7",color:"#92400E",borderRadius:3,padding:"0 3px",fontSize:9}}>RESET</span>}
        </div>
      )}
      {cell?.conf&&<div style={{fontSize:9,marginTop:2,display:"inline-block",background:CS[cell.conf]?.bg,color:CS[cell.conf]?.c,borderRadius:3,padding:"1px 4px"}}>{cell.conf}</div>}
    </div>
  );
}

// ── Admin Panel ───────────────────────────────────────────────────────────────
function AdminPanel({distributors,setDistributors,extraProducts,setExtraProducts,extraCustomers,setExtraCustomers,onClose}){
  const [activeDist,setActiveDist]=useState(distributors[0].name);
  const [newSku,setNewSku]=useState("");
  const [newDesc,setNewDesc]=useState("");
  const [newCust,setNewCust]=useState("");
  const [saving,setSaving]=useState(false);
  const [tab,setTab]=useState("products");

  const dist=distributors.find(d=>d.name===activeDist);
  const extraP=extraProducts[activeDist]||[];
  const extraC=extraCustomers[activeDist]||[];
  const allProducts=[...dist.products,...extraP];
  const allCustomers=[...dist.customers,...extraC];

  async function addProduct(){
    if(!newSku.trim()||!newDesc.trim()) return;
    setSaving(true);
    const prod={sku:newSku.trim(),desc:newDesc.trim()};
    const updated={...extraProducts,[activeDist]:[...extraP,prod]};
    setExtraProducts(updated);
    await saveExtraProducts(updated);
    setNewSku("");setNewDesc("");setSaving(false);
  }
  async function removeProduct(sku){
    const updated={...extraProducts,[activeDist]:extraP.filter(p=>p.sku!==sku)};
    setExtraProducts(updated);
    await saveExtraProducts(updated);
  }
  async function addCustomer(){
    if(!newCust.trim()) return;
    setSaving(true);
    const updated={...extraCustomers,[activeDist]:[...extraC,newCust.trim()]};
    setExtraCustomers(updated);
    await saveExtraCustomers(updated);
    setNewCust("");setSaving(false);
  }
  async function removeCustomer(c){
    const updated={...extraCustomers,[activeDist]:extraC.filter(x=>x!==c)};
    setExtraCustomers(updated);
    await saveExtraCustomers(updated);
  }

  return(
    <div style={{position:"fixed",zIndex:999,top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{background:"#fff",borderRadius:12,padding:20,width:"100%",maxWidth:520,maxHeight:"85vh",overflowY:"auto",boxShadow:"0 8px 30px rgba(0,0,0,0.2)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{fontSize:16,fontWeight:600}}>Admin — Manage Products & Customers</h2>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#9CA3AF"}}>×</button>
      </div>

      <div style={{display:"flex",gap:6,marginBottom:14}}>
        {distributors.map(d=>(
          <button key={d.name} onClick={()=>setActiveDist(d.name)}
            style={{background:activeDist===d.name?"#1E40AF":"#F3F4F6",color:activeDist===d.name?"#fff":"#374151",border:"none",borderRadius:6,padding:"5px 14px",fontSize:13,fontWeight:activeDist===d.name?600:400,cursor:"pointer"}}>
            {d.name}
          </button>
        ))}
      </div>

      <div style={{display:"flex",gap:0,marginBottom:14,borderBottom:"2px solid #E5E7EB"}}>
        {["products","customers"].map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            style={{background:"none",border:"none",borderBottom:tab===t?"2px solid #166534":"2px solid transparent",marginBottom:"-2px",padding:"8px 16px",fontSize:13,fontWeight:tab===t?600:400,cursor:"pointer",color:tab===t?"#166534":"#6B7280",textTransform:"capitalize"}}>
            {t}
          </button>
        ))}
      </div>

      {tab==="products"&&(
        <>
          <div style={{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:8,padding:12,marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:600,color:"#0369A1",marginBottom:8}}>Add new product to {activeDist}</div>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <input type="text" value={newSku} placeholder="SKU (e.g. NG-9999)"
                onChange={e=>setNewSku(e.target.value)}
                style={{flex:"0 0 140px",border:"1px solid #BAE6FD",borderRadius:5,padding:"6px 8px",fontSize:13}}/>
              <input type="text" value={newDesc} placeholder="Description"
                onChange={e=>setNewDesc(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")addProduct();}}
                style={{flex:1,border:"1px solid #BAE6FD",borderRadius:5,padding:"6px 8px",fontSize:13}}/>
            </div>
            <button onClick={addProduct} disabled={saving||!newSku||!newDesc}
              style={{background:"#166534",color:"#fff",border:"none",borderRadius:6,padding:"6px 16px",fontSize:12,fontWeight:500,cursor:"pointer",opacity:(!newSku||!newDesc)?0.5:1}}>
              {saving?"Adding…":"Add product"}
            </button>
          </div>
          <div style={{fontSize:12,color:"#6B7280",marginBottom:6,fontWeight:500}}>All products ({allProducts.length}) — custom ones can be removed</div>
          <div style={{maxHeight:300,overflowY:"auto"}}>
            {allProducts.map(p=>{
              const isExtra=extraP.some(ep=>ep.sku===p.sku);
              return(
                <div key={p.sku} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderBottom:"1px solid #F3F4F6",background:isExtra?"#F0FDF4":"#fff"}}>
                  <span style={{fontSize:12,fontWeight:600,color:p.sku.startsWith("NG-")?"#B91C1C":p.sku.startsWith("CVS-")?"#1D4ED8":"#374151",minWidth:100}}>{p.sku}</span>
                  <span style={{fontSize:12,color:"#374151",flex:1}}>{p.desc}</span>
                  {isExtra&&<span style={{fontSize:10,background:"#DCFCE7",color:"#166534",borderRadius:3,padding:"1px 5px"}}>new</span>}
                  {isExtra&&<button onClick={()=>removeProduct(p.sku)} style={{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:16,padding:"0 4px"}}>×</button>}
                </div>
              );
            })}
          </div>
        </>
      )}

      {tab==="customers"&&(
        <>
          <div style={{background:"#F0F9FF",border:"1px solid #BAE6FD",borderRadius:8,padding:12,marginBottom:14}}>
            <div style={{fontSize:12,fontWeight:600,color:"#0369A1",marginBottom:8}}>Add new customer to {activeDist}</div>
            <div style={{display:"flex",gap:8}}>
              <input type="text" value={newCust} placeholder="Customer name"
                onChange={e=>setNewCust(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")addCustomer();}}
                style={{flex:1,border:"1px solid #BAE6FD",borderRadius:5,padding:"6px 8px",fontSize:13}}/>
              <button onClick={addCustomer} disabled={saving||!newCust}
                style={{background:"#166534",color:"#fff",border:"none",borderRadius:6,padding:"6px 16px",fontSize:12,fontWeight:500,cursor:"pointer",opacity:!newCust?0.5:1}}>
                {saving?"Adding…":"Add"}
              </button>
            </div>
          </div>
          <div style={{fontSize:12,color:"#6B7280",marginBottom:6,fontWeight:500}}>All customers ({allCustomers.length})</div>
          {allCustomers.map(c=>{
            const isExtra=extraC.includes(c);
            return(
              <div key={c} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",borderBottom:"1px solid #F3F4F6",background:isExtra?"#F0FDF4":"#fff"}}>
                <span style={{flex:1,fontSize:13}}>{c}</span>
                {isExtra&&<span style={{fontSize:10,background:"#DCFCE7",color:"#166534",borderRadius:3,padding:"1px 5px"}}>new</span>}
                {isExtra&&<button onClick={()=>removeCustomer(c)} style={{background:"none",border:"none",cursor:"pointer",color:"#DC2626",fontSize:16,padding:"0 4px"}}>×</button>}
              </div>
            );
          })}
        </>
      )}
    </div>
    </div>
  );
}

async function sendSubmitEmail({repName,distLabel,monthLabel,year,rows,totalCases}){
  try{
    const tableRows=rows.map(r=>`
      <tr style="border-bottom:1px solid #E5E7EB">
        <td style="padding:6px 10px;font-size:13px;color:#374151">${r.customer}</td>
        <td style="padding:6px 10px;font-size:13px;color:#B91C1C;font-weight:600">${r.sku}</td>
        <td style="padding:6px 10px;font-size:13px;color:#374151">${r.desc}</td>
        <td style="padding:6px 10px;font-size:13px;font-weight:700;text-align:right">${r.cases.toLocaleString()}</td>
        <td style="padding:6px 10px;font-size:12px;color:#6B7280;text-align:center">${r.conf||"—"}</td>
        <td style="padding:6px 10px;font-size:12px;color:#6B7280">${r.notes||""}</td>
      </tr>`).join("");
    const html=`
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:700px;margin:0 auto">
        <div style="background:#166534;padding:20px 24px;border-radius:8px 8px 0 0">
          <h1 style="color:#fff;margin:0;font-size:18px">Forecast Submitted ✓</h1>
          <p style="color:#86EFAC;margin:4px 0 0;font-size:14px">${distLabel} · ${monthLabel} ${year}</p>
        </div>
        <div style="background:#fff;border:1px solid #E5E7EB;border-top:none;padding:20px 24px;border-radius:0 0 8px 8px">
          <div style="display:flex;gap:20px;margin-bottom:20px">
            <div style="background:#F0FDF4;border-radius:8px;padding:12px 20px;flex:1;text-align:center">
              <div style="font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.06em">Rep</div>
              <div style="font-size:20px;font-weight:600;color:#166534;margin-top:2px">${repName}</div>
            </div>
            <div style="background:#F0FDF4;border-radius:8px;padding:12px 20px;flex:1;text-align:center">
              <div style="font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.06em">Total Cases</div>
              <div style="font-size:20px;font-weight:600;color:#166534;margin-top:2px">${totalCases.toLocaleString()}</div>
            </div>
            <div style="background:#F0FDF4;border-radius:8px;padding:12px 20px;flex:1;text-align:center">
              <div style="font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.06em">Products</div>
              <div style="font-size:20px;font-weight:600;color:#166534;margin-top:2px">${rows.length}</div>
            </div>
          </div>
          <table style="width:100%;border-collapse:collapse;border:1px solid #E5E7EB;border-radius:8px;overflow:hidden">
            <thead>
              <tr style="background:#F9FAFB">
                <th style="padding:8px 10px;font-size:12px;text-align:left;color:#6B7280;border-bottom:2px solid #E5E7EB">Customer</th>
                <th style="padding:8px 10px;font-size:12px;text-align:left;color:#6B7280;border-bottom:2px solid #E5E7EB">SKU</th>
                <th style="padding:8px 10px;font-size:12px;text-align:left;color:#6B7280;border-bottom:2px solid #E5E7EB">Description</th>
                <th style="padding:8px 10px;font-size:12px;text-align:right;color:#6B7280;border-bottom:2px solid #E5E7EB">Cases</th>
                <th style="padding:8px 10px;font-size:12px;text-align:center;color:#6B7280;border-bottom:2px solid #E5E7EB">Conf</th>
                <th style="padding:8px 10px;font-size:12px;text-align:left;color:#6B7280;border-bottom:2px solid #E5E7EB">Notes</th>
              </tr>
            </thead>
            <tbody>${tableRows}</tbody>
          </table>
          <p style="margin:16px 0 0;font-size:12px;color:#9CA3AF">Submitted on ${new Date().toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})}</p>
        </div>
      </div>`;
    await fetch("https://api.resend.com/emails",{
      method:"POST",
      headers:{"Authorization":"Bearer re_Cj4RhwkN_9uvhsaNGHGSgZ6o5KzxkMgTo","Content-Type":"application/json"},
      body:JSON.stringify({
        from:"Forecast App <onboarding@resend.dev>",
        to:["emmanuel@cibovita.com"],
        subject:`${repName} submitted ${distLabel} forecast — ${monthLabel} ${year} (${totalCases.toLocaleString()} cases)`,
        html
      })
    });
  }catch(e){console.error("Email error:",e);}
}

// ── Rep Grid ─────────────────────────────────────────────────────────────────
function RepGrid({repName,forecasts,setForecasts,extraProducts,setExtraProducts,extraCustomers,setExtraCustomers,distributors,year,setYear,activeDist,setActiveDist}){
  const [activeCustomer,setActiveCustomer]=useState(null);
  const [editCell,setEditCell]=useState(null);
  const [newCustomer,setNewCustomer]=useState("");
  const [addingCustomer,setAddingCustomer]=useState(false);
  const [showAdmin,setShowAdmin]=useState(false);
  const [submitMonth,setSubmitMonth]=useState(null);
  const [submitting,setSubmitting]=useState(false);
  const [submitDone,setSubmitDone]=useState(null);

  const dist=distributors.find(d=>d.name===activeDist)||distributors[0];
  const extraC=extraCustomers[dist.name]||[];
  const extraP=extraProducts[dist.name]||[];
  const allCustomers=[...dist.customers,...extraC];
  const allProducts=[...dist.products,...extraP];
  const customer=activeCustomer||(allCustomers[0]||"");
  const visMonths=YEAR_MONTHS;
  const key=(c,sku,m)=>`${dist.name}||${c}||${sku}||${year}||${m}`;

  async function handleSave(cellKey,cellData){
    const prevData=forecasts[cellKey];
    const updated={...forecasts,[cellKey]:cellData};
    setForecasts(updated);
    await saveSingleForecast(cellKey,cellData,prevData);
  }
  async function handleDelete(cellKey){
    const prevData=forecasts[cellKey];
    const updated={...forecasts};delete updated[cellKey];
    setForecasts(updated);
    await deleteForecast(cellKey,prevData);
  }
  async function addCustomer(){
    const name=newCustomer.trim();if(!name) return;
    const updated={...extraCustomers,[dist.name]:[...extraC,name]};
    setExtraCustomers(updated);
    await saveExtraCustomers(updated);
    setActiveCustomer(name);setNewCustomer("");setAddingCustomer(false);
  }

  async function handleSubmitMonth(monthKey){
    setSubmitting(true);
    const month=YEAR_MONTHS.find(m=>m.key===monthKey);
    const rows=[];
    allCustomers.forEach(cust=>{
      allProducts.forEach(prod=>{
        const k=`${dist.name}||${cust}||${prod.sku}||${year}||${monthKey}`;
        const cell=forecasts[k];
        if(!cell) return;
        const fc=calcForecast(cell);
        if(fc?.total>0) rows.push({customer:cust,sku:prod.sku,desc:prod.desc,cases:fc.total,conf:cell.conf,notes:cell.notes});
      });
    });
    const totalCases=rows.reduce((t,r)=>t+r.cases,0);
    if(rows.length===0){setSubmitting(false);setSubmitMonth(null);return;}
    await sendSubmitEmail({repName,distLabel:dist.label,monthLabel:month?.label,year,rows,totalCases});
    setSubmitting(false);
    setSubmitDone(`${month?.label} ${year}`);
    setSubmitMonth(null);
    setTimeout(()=>setSubmitDone(null),4000);
  }

  const monthTotal=(m)=>{
    let t=0;
    allProducts.forEach(p=>{const fc=calcForecast(forecasts[key(customer,p.sku,m)]);if(fc)t+=fc.total;});
    return t;
  };

  return(
    <div style={{padding:"14px 0"}}>
      {showAdmin&&<AdminPanel distributors={distributors} setDistributors={()=>{}}
        extraProducts={extraProducts} setExtraProducts={setExtraProducts}
        extraCustomers={extraCustomers} setExtraCustomers={setExtraCustomers}
        onClose={()=>setShowAdmin(false)}/>}

      {/* Submit confirm modal */}
      {submitMonth&&(
        <div style={{position:"fixed",zIndex:999,top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
          <div style={{background:"#fff",borderRadius:12,padding:24,width:"100%",maxWidth:380,boxShadow:"0 8px 30px rgba(0,0,0,0.2)"}}>
            <div style={{fontSize:18,marginBottom:8}}>📤</div>
            <h2 style={{fontSize:16,fontWeight:600,margin:"0 0 8px"}}>Submit {YEAR_MONTHS.find(m=>m.key===submitMonth)?.label} {year} forecast?</h2>
            <p style={{fontSize:13,color:"#6B7280",margin:"0 0 20px"}}>This will email your {dist.label} forecast for {YEAR_MONTHS.find(m=>m.key===submitMonth)?.label} to the manager. You can still edit entries after submitting.</p>
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>setSubmitMonth(null)} style={{background:"none",border:"1px solid #E5E7EB",borderRadius:7,padding:"8px 16px",fontSize:13,cursor:"pointer"}}>Cancel</button>
              <button onClick={()=>handleSubmitMonth(submitMonth)} disabled={submitting}
                style={{background:"#166534",color:"#fff",border:"none",borderRadius:7,padding:"8px 20px",fontSize:13,fontWeight:500,cursor:"pointer",opacity:submitting?0.7:1}}>
                {submitting?"Sending…":"Yes, submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success toast */}
      {submitDone&&(
        <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#166534",color:"#fff",borderRadius:8,padding:"10px 20px",fontSize:13,fontWeight:500,zIndex:1000,boxShadow:"0 4px 12px rgba(0,0,0,0.2)"}}>
          ✓ {submitDone} forecast submitted — email sent to manager
        </div>
      )}

      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
        <span style={{fontSize:12,color:"#6B7280",fontWeight:500}}>Distributor:</span>
        {distributors.map(d=>(
          <button key={d.name} onClick={()=>{setActiveDist(d.name);setActiveCustomer(null);}}
            style={{background:activeDist===d.name?"#1E40AF":"#F3F4F6",color:activeDist===d.name?"#fff":"#374151",border:"none",borderRadius:6,padding:"5px 14px",fontSize:13,fontWeight:activeDist===d.name?600:400,cursor:"pointer"}}>
            {d.name}
          </button>
        ))}
        <select value={year} onChange={e=>setYear(e.target.value)}
          style={{marginLeft:"auto",border:"1px solid #D1D5DB",borderRadius:6,padding:"5px 8px",fontSize:13,background:"#fff"}}>
          {YEARS.map(y=><option key={y}>{y}</option>)}
        </select>
        <button onClick={()=>setShowAdmin(true)}
          style={{background:"#F3F4F6",border:"1px solid #E5E7EB",borderRadius:6,padding:"5px 12px",fontSize:12,cursor:"pointer",color:"#374151"}}>
          ⚙ Manage products
        </button>
      </div>

      <div style={{background:"#EFF6FF",border:"1px solid #BFDBFE",borderRadius:8,padding:"10px 14px",marginBottom:12}}>
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
          <span style={{fontSize:12,color:"#1E40AF",fontWeight:600,marginRight:4}}>Customer:</span>
          {allCustomers.map(c=>(
            <button key={c} onClick={()=>setActiveCustomer(c)}
              style={{background:customer===c?"#1E40AF":"#fff",color:customer===c?"#fff":"#374151",
                border:`1px solid ${customer===c?"#1E40AF":"#BFDBFE"}`,borderRadius:6,padding:"4px 12px",
                fontSize:12,fontWeight:customer===c?600:400,cursor:"pointer"}}>
              {c}{extraC.includes(c)&&<span style={{marginLeft:3,fontSize:9,opacity:0.7}}>new</span>}
            </button>
          ))}
          {addingCustomer?(
            <div style={{display:"flex",gap:6,alignItems:"center"}}>
              <input autoFocus type="text" value={newCustomer} placeholder="Customer name"
                onChange={e=>setNewCustomer(e.target.value)}
                onKeyDown={e=>{if(e.key==="Enter")addCustomer();if(e.key==="Escape")setAddingCustomer(false);}}
                style={{border:"1px solid #BFDBFE",borderRadius:6,padding:"4px 10px",fontSize:12,width:160}}/>
              <button onClick={addCustomer} style={{background:"#166534",color:"#fff",border:"none",borderRadius:6,padding:"4px 12px",fontSize:12,cursor:"pointer"}}>Add</button>
              <button onClick={()=>setAddingCustomer(false)} style={{background:"none",border:"none",cursor:"pointer",fontSize:16,color:"#9CA3AF"}}>×</button>
            </div>
          ):(
            <button onClick={()=>setAddingCustomer(true)}
              style={{background:"none",border:"1px dashed #93C5FD",borderRadius:6,padding:"4px 10px",fontSize:12,color:"#3B82F6",cursor:"pointer"}}>
              + Add customer
            </button>
          )}
        </div>
      </div>

      <div style={{overflowX:"auto"}}>
        <table style={{borderCollapse:"collapse",fontSize:12,width:"100%",minWidth:1100}}>
          <thead>
            <tr style={{background:"#F3F4F6"}}>
              <th style={{...TH,width:100,textAlign:"left",position:"sticky",left:0,background:"#F3F4F6",zIndex:10}}>Product #</th>
              <th style={{...TH,minWidth:180,textAlign:"left",position:"sticky",left:100,background:"#F3F4F6",zIndex:10}}>Description</th>
              {visMonths.map(m=>{
                const mTotal=monthTotal(m.key);
                return(
                <th key={m.key} style={{...TH,minWidth:110,textAlign:"center",borderLeft:"2px solid #D1D5DB"}}>
                  <div>{m.label}</div>
                  <div style={{fontWeight:600,color:"#166534",fontSize:11}}>{mTotal.toLocaleString()}</div>
                  <div style={{fontWeight:400,color:"#9CA3AF",fontSize:10}}>{weeksInMonth(m.key,year).toFixed(1)} wks</div>
                  {mTotal>0&&(
                    <button onClick={()=>setSubmitMonth(m.key)}
                      style={{marginTop:3,background:"#166534",color:"#fff",border:"none",borderRadius:4,padding:"2px 8px",fontSize:9,fontWeight:500,cursor:"pointer",whiteSpace:"nowrap"}}>
                      Submit ↗
                    </button>
                  )}
                </th>
              )})}
            </tr>
          </thead>
          <tbody>
            {allProducts.map(prod=>{
              const skuColor=prod.sku.startsWith("NG-")?"#B91C1C":prod.sku.startsWith("CVS-")?"#1D4ED8":prod.sku.startsWith("GEN-")?"#065F46":"#374151";
              return(
                <tr key={prod.sku} style={{borderBottom:"1px solid #F3F4F6"}}
                  onMouseEnter={e=>e.currentTarget.style.background="#F9FAFB"}
                  onMouseLeave={e=>e.currentTarget.style.background=""}>
                  <td style={{...TD,color:skuColor,fontWeight:600,position:"sticky",left:0,background:"inherit",zIndex:5}}>{prod.sku}</td>
                  <td style={{...TD,maxWidth:220,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",position:"sticky",left:100,background:"inherit",zIndex:5}} title={prod.desc}>{prod.desc}</td>
                  {visMonths.map(m=>{
                    const k=key(customer,prod.sku,m.key);
                    const cell=forecasts[k];
                    const isOpen=editCell===k;
                    const inherited=getInheritedStores(forecasts,dist.name,prod.sku,customer,year,m.key);
                    const fc=calcForecast(cell);
                    const hasPromo=fc&&(fc.liftUnits>0||fc.liftFlat>0);
                    const bg=isOpen?"#EFF6FF":fc?.total>0?(hasPromo?"#FAF5FF":"#F0FDF4"):"#fff";
                    return(
                      <td key={m.key} onClick={(e)=>{if(isOpen)return;setEditCell(k);}}
                        style={{...TD,borderLeft:"2px solid #E5E7EB",cursor:"pointer",background:bg,padding:"5px 8px",position:"relative",minWidth:110}}>
                        <CellDisplay cell={cell} inherited={inherited}/>
                        {isOpen&&(
                          <div onClick={e=>e.stopPropagation()}>
                            <PlanningPanel dist={dist.name} customer={customer} sku={prod.sku} monthKey={m.key}
                              year={year} forecasts={forecasts} onSave={handleSave} onDelete={handleDelete}
                              onClose={()=>setEditCell(null)} repName={repName}/>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── History Modal ─────────────────────────────────────────────────────────────
function HistoryModal({cellKey,onClose}){
  const [entries,setEntries]=useState([]);
  const [loading,setLoading]=useState(true);
  const parts=cellKey.split("||");

  useEffect(()=>{
    loadHistory(cellKey).then(rows=>{setEntries(rows);setLoading(false);});
  },[cellKey]);

  function fmt(ts){
    try{return new Date(ts).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"});}
    catch{return ts;}
  }

  return(
    <div style={{position:"fixed",zIndex:1000,top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{background:"#fff",borderRadius:12,padding:20,width:"100%",maxWidth:480,maxHeight:"80vh",overflowY:"auto",boxShadow:"0 8px 30px rgba(0,0,0,0.2)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <h2 style={{fontSize:15,fontWeight:600,margin:0}}>Change history</h2>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#9CA3AF"}}>×</button>
      </div>
      <div style={{fontSize:12,color:"#6B7280",marginBottom:16}}>{parts[1]} · {parts[2]} · {parts[4]} {parts[3]}</div>

      {loading?(
        <div style={{textAlign:"center",padding:"30px 0",color:"#9CA3AF"}}>Loading history…</div>
      ):entries.length===0?(
        <div style={{textAlign:"center",padding:"30px 0",color:"#9CA3AF"}}>No history yet for this cell.</div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {entries.map((e,i)=>{
            const isDelete=e.action==="delete";
            const changed=e.prev_cases!==e.total_cases;
            return(
              <div key={i} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid #F3F4F6",alignItems:"flex-start"}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:isDelete?"#FEF2F2":changed?"#EFF6FF":"#F0FDF4",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,flexShrink:0}}>
                  {isDelete?"🗑":changed?"✏️":"✓"}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontWeight:600,fontSize:13,color:"#374151"}}>{e.rep||"Unknown"}</span>
                    <span style={{fontSize:11,color:"#9CA3AF"}}>{fmt(e.created_at)}</span>
                  </div>
                  <div style={{fontSize:12,color:"#6B7280",marginTop:2}}>
                    {isDelete?(
                      <span style={{color:"#DC2626"}}>Cleared entry <span style={{textDecoration:"line-through"}}>{e.prev_cases?.toLocaleString()} cases</span></span>
                    ):e.prev_cases>0?(
                      <>Changed: <strong style={{color:"#374151"}}>{e.prev_cases?.toLocaleString()}</strong> → <strong style={{color:"#166534"}}>{e.total_cases?.toLocaleString()} cases</strong></>
                    ):(
                      <>New entry: <strong style={{color:"#166534"}}>{e.total_cases?.toLocaleString()} cases</strong></>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
}

// ── Activity Feed (Manager) ───────────────────────────────────────────────────
function ActivityFeed({dist,year,onClose}){
  const [entries,setEntries]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    loadAllHistory(dist,year).then(rows=>{setEntries(rows);setLoading(false);});
  },[dist,year]);

  function fmt(ts){
    try{return new Date(ts).toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});}
    catch{return ts;}
  }

  return(
    <div style={{position:"fixed",zIndex:1000,top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
    <div style={{background:"#fff",borderRadius:12,padding:20,width:"100%",maxWidth:500,maxHeight:"85vh",overflowY:"auto",boxShadow:"0 8px 30px rgba(0,0,0,0.2)"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <h2 style={{fontSize:15,fontWeight:600,margin:0}}>Recent activity — {dist} {year}</h2>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#9CA3AF"}}>×</button>
      </div>
      <div style={{fontSize:12,color:"#6B7280",marginBottom:16}}>Last 100 changes across all reps</div>
      {loading?(
        <div style={{textAlign:"center",padding:"30px 0",color:"#9CA3AF"}}>Loading…</div>
      ):entries.length===0?(
        <div style={{textAlign:"center",padding:"30px 0",color:"#9CA3AF"}}>No activity yet.</div>
      ):(
        <div style={{display:"flex",flexDirection:"column",gap:0}}>
          {entries.map((e,i)=>{
            const isDelete=e.action==="delete";
            return(
              <div key={i} style={{display:"flex",gap:10,padding:"8px 0",borderBottom:"1px solid #F3F4F6",alignItems:"flex-start"}}>
                <div style={{width:28,height:28,borderRadius:"50%",background:isDelete?"#FEF2F2":"#F0FDF4",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0}}>
                  {isDelete?"🗑":"✓"}
                </div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between"}}>
                    <span style={{fontWeight:600,fontSize:12}}>{e.rep||"Unknown"}</span>
                    <span style={{fontSize:11,color:"#9CA3AF"}}>{fmt(e.created_at)}</span>
                  </div>
                  <div style={{fontSize:11,color:"#6B7280",marginTop:1}}>
                    {e.customer} · {e.sku} · {e.month} {e.year}
                    {isDelete?<span style={{color:"#DC2626"}}> — cleared</span>:
                      e.prev_cases>0?<> — <strong>{e.prev_cases?.toLocaleString()}</strong> → <strong style={{color:"#166534"}}>{e.total_cases?.toLocaleString()} cases</strong></>:
                      <strong style={{color:"#166634"}}> — {e.total_cases?.toLocaleString()} cases (new)</strong>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
}


function ManagerView({forecasts,setForecasts,distributors,extraProducts,extraCustomers,year,setYear,onRefresh}){
  const [activeDist,setActiveDist]=useState(distributors[0].name);
  const [filterCustomer,setFilterCustomer]=useState("All");
  const [filterRep,setFilterRep]=useState("All");
  const [showAdmin,setShowAdmin]=useState(false);
  const [historyCell,setHistoryCell]=useState(null);
  const [showActivity,setShowActivity]=useState(false);
  const dist=distributors.find(d=>d.name===activeDist);
  const extraC=extraCustomers[activeDist]||[];
  const extraP=extraProducts[activeDist]||[];
  const allCustomers=["All",...dist.customers,...extraC];
  const allProducts=[...dist.products,...extraP];
  const visMonths=YEAR_MONTHS;
  const key=(c,sku,m)=>`${dist.name}||${c}||${sku}||${year}||${m}`;

  const getCustomersWithData=()=>{
    const set=new Set();
    Object.keys(forecasts).forEach(k=>{
      const parts=k.split("||");
      if(parts[0]===dist.name&&parts[3]===year){
        const fc=calcForecast(forecasts[k]);
        if(fc?.total>0){const rep=forecasts[k]?.rep;if(filterRep==="All"||!rep||rep===filterRep)set.add(parts[1]);}
      }
    });
    return [...set].sort();
  };
  const customersToShow=filterCustomer==="All"?getCustomersWithData():[filterCustomer];

  const monthGrandTotal=(m)=>{
    let t=0;
    customersToShow.forEach(c=>{
      allProducts.forEach(p=>{
        const v=forecasts[key(c,p.sku,m)];const rep=v?.rep;
        if(filterRep==="All"||!rep||rep===filterRep){const fc=calcForecast(v);if(fc)t+=fc.total;}
      });
    });
    return t;
  };

  return(
    <div style={{padding:"14px 0"}}>
      {showAdmin&&<AdminPanel distributors={distributors} setDistributors={()=>{}}
        extraProducts={extraProducts} setExtraProducts={()=>{}}
        extraCustomers={extraCustomers} setExtraCustomers={()=>{}}
        onClose={()=>setShowAdmin(false)}/>}
      {historyCell&&<HistoryModal cellKey={historyCell} onClose={()=>setHistoryCell(null)}/>}
      {showActivity&&<ActivityFeed dist={activeDist} year={year} onClose={()=>setShowActivity(false)}/>}

      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:12,flexWrap:"wrap"}}>
        {distributors.map(d=>(
          <button key={d.name} onClick={()=>{setActiveDist(d.name);setFilterCustomer("All");}}
            style={{background:activeDist===d.name?"#1E40AF":"#F3F4F6",color:activeDist===d.name?"#fff":"#374151",border:"none",borderRadius:6,padding:"5px 14px",fontSize:13,fontWeight:activeDist===d.name?600:400,cursor:"pointer"}}>
            {d.name}
          </button>
        ))}
        <select value={year} onChange={e=>setYear(e.target.value)} style={{border:"1px solid #D1D5DB",borderRadius:6,padding:"5px 8px",fontSize:13,background:"#fff"}}>
          {YEARS.map(y=><option key={y}>{y}</option>)}
        </select>
        <select value={filterCustomer} onChange={e=>setFilterCustomer(e.target.value)} style={{border:"1px solid #D1D5DB",borderRadius:6,padding:"5px 8px",fontSize:13,background:"#fff",minWidth:130}}>
          {allCustomers.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterRep} onChange={e=>setFilterRep(e.target.value)} style={{border:"1px solid #D1D5DB",borderRadius:6,padding:"5px 8px",fontSize:13,background:"#fff"}}>
          <option value="All">All Reps</option>
          {REPS.map(r=><option key={r} value={r}>{r}</option>)}
        </select>
        <button onClick={onRefresh} style={{background:"none",border:"1px solid #D1D5DB",borderRadius:6,padding:"5px 12px",fontSize:12,cursor:"pointer"}}>↻ Refresh</button>
        <button onClick={()=>setShowActivity(true)}
          style={{background:"#EFF6FF",color:"#1E40AF",border:"1px solid #BFDBFE",borderRadius:6,padding:"5px 12px",fontSize:12,cursor:"pointer",fontWeight:500}}>
          🕐 Activity
        </button>
        <button onClick={()=>exportCSV(forecasts,distributors,year,activeDist)}
          style={{background:"#166534",color:"#fff",border:"none",borderRadius:6,padding:"5px 14px",fontSize:12,fontWeight:500,cursor:"pointer"}}>
          ↓ Export CSV
        </button>
      </div>

      {customersToShow.length===0?(
        <div style={{textAlign:"center",padding:"60px 0",color:"#9CA3AF",fontSize:14}}>No forecast data entered yet for {dist.label}.</div>
      ):(
        <div style={{overflowX:"auto"}}>
          <table style={{borderCollapse:"collapse",fontSize:12,width:"100%",minWidth:1100}}>
            <thead>
              <tr style={{background:"#F3F4F6"}}>
                <th style={{...TH,width:120,textAlign:"left",position:"sticky",left:0,background:"#F3F4F6",zIndex:10}}>Customer</th>
                <th style={{...TH,width:100,textAlign:"left",position:"sticky",left:120,background:"#F3F4F6",zIndex:10}}>Product #</th>
                <th style={{...TH,minWidth:180,textAlign:"left",position:"sticky",left:220,background:"#F3F4F6",zIndex:10}}>Description</th>
                {visMonths.map(m=>(
                  <th key={m.key} style={{...TH,minWidth:110,textAlign:"center",borderLeft:"2px solid #D1D5DB"}}>
                    <div>{m.label}</div>
                    <div style={{fontWeight:700,color:"#166534",fontSize:11}}>{monthGrandTotal(m.key).toLocaleString()}</div>
                    <div style={{fontWeight:400,color:"#9CA3AF",fontSize:10}}>{weeksInMonth(m.key,year).toFixed(1)} wks</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customersToShow.map(customer=>{
                const custTotal=visMonths.reduce((t,m)=>{
                  allProducts.forEach(p=>{
                    const v=forecasts[key(customer,p.sku,m.key)];const rep=v?.rep;
                    if(filterRep==="All"||!rep||rep===filterRep){const fc=calcForecast(v);if(fc)t+=fc.total;}
                  });return t;
                },0);
                const custProds=allProducts.filter(p=>
                  visMonths.some(m=>{
                    const v=forecasts[key(customer,p.sku,m.key)];const fc=calcForecast(v);const rep=v?.rep;
                    return fc?.total>0&&(filterRep==="All"||!rep||rep===filterRep);
                  })
                );
                if(custProds.length===0) return null;
                return(
                  <>
                    <tr key={customer+"_h"} style={{background:"#E8F0E8"}}>
                      <td colSpan={3+visMonths.length} style={{padding:"6px 10px",fontWeight:600,fontSize:13,color:"#166534",borderTop:"2px solid #C6D9C6"}}>
                        {customer}<span style={{marginLeft:10,fontWeight:400,fontSize:12,color:"#4B7A4B"}}>{custTotal.toLocaleString()} cases total</span>
                      </td>
                    </tr>
                    {custProds.map(prod=>{
                      const skuColor=prod.sku.startsWith("NG-")?"#B91C1C":prod.sku.startsWith("CVS-")?"#1D4ED8":prod.sku.startsWith("GEN-")?"#065F46":"#374151";
                      return(
                        <tr key={customer+prod.sku} style={{borderBottom:"1px solid #F3F4F6"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#F9FAFB"}
                          onMouseLeave={e=>e.currentTarget.style.background=""}>
                          <td style={{...TD,color:"#6B7280",fontSize:11,position:"sticky",left:0,background:"inherit",zIndex:5}}>{customer}</td>
                          <td style={{...TD,color:skuColor,fontWeight:600,position:"sticky",left:120,background:"inherit",zIndex:5}}>{prod.sku}</td>
                          <td style={{...TD,maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",position:"sticky",left:220,background:"inherit",zIndex:5}} title={prod.desc}>{prod.desc}</td>
                          {visMonths.map(m=>{
                            const v=forecasts[key(customer,prod.sku,m.key)];const rep=v?.rep;
                            const show=v&&(filterRep==="All"||!rep||rep===filterRep);
                            const fc=calcForecast(show?v:null);
                            const hasPromo=fc&&(fc.liftUnits>0||fc.liftFlat>0);
                            return(
                              <td key={m.key} style={{...TD,borderLeft:"2px solid #F3F4F6",textAlign:"right",background:!fc?.total?"#fff":hasPromo?"#FAF5FF":"#F0FDF4"}}>
                                {fc?.total>0?(
                                  <div>
                                    <div style={{fontWeight:700,fontSize:13}}>{fc.total.toLocaleString()}</div>
                                    <div style={{fontSize:10,color:"#9CA3AF",marginTop:1}}>{fc.useManual?<span style={{color:"#6366F1"}}>manual</span>:<>{fc.base.toLocaleString()} base</>}</div>
                                    {hasPromo&&<div style={{fontSize:10,color:"#7C3AED"}}>+{(fc.liftUnits+fc.liftFlat).toLocaleString()} promo</div>}
                                    {v?.isReset&&<div style={{fontSize:9,color:"#D97706"}}>RESET {v.stores}st</div>}
                                    {v?.conf&&<div style={{fontSize:9,display:"inline-block",background:CS[v.conf]?.bg,color:CS[v.conf]?.c,borderRadius:3,padding:"1px 4px",marginTop:2}}>{v.conf}</div>}
                                    {v?.rep&&<div style={{fontSize:9,color:"#CBD5E1",marginTop:1}}>{v.rep}</div>}
                                    <button onClick={()=>setHistoryCell(key(customer,prod.sku,m.key))}
                                      style={{marginTop:3,background:"none",border:"1px solid #E5E7EB",borderRadius:3,padding:"1px 6px",fontSize:9,cursor:"pointer",color:"#9CA3AF"}}>
                                      🕐 history
                                    </button>
                                  </div>
                                ):<span style={{color:"#E5E7EB"}}>—</span>}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [screen,setScreen]=useState("login");
  const [repName,setRepName]=useState("");
  const [pinInput,setPinInput]=useState("");
  const [pinError,setPinError]=useState("");
  const [selectedRep,setSelectedRep]=useState("");
  const [managerInput,setManagerInput]=useState("");
  const [forecasts,setForecasts]=useState({});
  const [extraCustomers,setExtraCustomers]=useState({});
  const [extraProducts,setExtraProducts]=useState({});
  const [loading,setLoading]=useState(false);
  const [year,setYear]=useState("2026");
  const [activeDist,setActiveDist]=useState(DEFAULT_DISTRIBUTORS[0].name);
  const [distributors]=useState(DEFAULT_DISTRIBUTORS);

  const refresh=useCallback(async()=>{
    setLoading(true);
    const {forecasts:f,extraCustomers:ec,extraProducts:ep}=await loadAll();
    setForecasts(f);setExtraCustomers(ec);setExtraProducts(ep);setLoading(false);
  },[]);

  useEffect(()=>{if(screen!=="login"&&Object.keys(forecasts).length===0)refresh();},[screen]);

  function handleRepLogin(){
    if(!selectedRep){setPinError("Please select your name");return;}
    if(pinInput!==REP_PINS[selectedRep]){setPinError("Incorrect PIN");return;}
    setRepName(selectedRep);setPinError("");setScreen("rep");
  }
  function handleManagerLogin(){
    if(managerInput===MANAGER_PIN){setScreen("manager");}
    else setPinError("Incorrect manager PIN");
  }

  if(screen==="login") return(
    <div style={{minHeight:"100vh",background:"#F9FAFB",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:16,padding:"32px 28px",width:"100%",maxWidth:400}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.12em",color:"#166534",textTransform:"uppercase",marginBottom:6}}>Distributor Forecast</div>
          <h1 style={{fontSize:22,fontWeight:700,margin:0}}>Field Sales Portal</h1>
          <p style={{color:"#9CA3AF",fontSize:13,margin:"6px 0 0"}}>DOT · KEHE · TOPS</p>
        </div>

        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:600,color:"#9CA3AF",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em"}}>Rep login</div>
          <select value={selectedRep} onChange={e=>{setSelectedRep(e.target.value);setPinError("");}}
            style={{width:"100%",border:"1px solid #E5E7EB",borderRadius:8,padding:"10px 12px",fontSize:14,marginBottom:10,background:"#fff",color:selectedRep?"#374151":"#9CA3AF"}}>
            <option value="">Select your name…</option>
            {REPS.map(r=><option key={r} value={r}>{r}</option>)}
          </select>
          <input type="password" placeholder="Enter your PIN" value={pinInput}
            onChange={e=>{setPinInput(e.target.value);setPinError("");}}
            onKeyDown={e=>{if(e.key==="Enter")handleRepLogin();}}
            style={{width:"100%",border:"1px solid #E5E7EB",borderRadius:8,padding:"10px 12px",fontSize:14,marginBottom:10,boxSizing:"border-box"}}/>
          <button onClick={handleRepLogin}
            style={{width:"100%",background:"#166534",color:"#fff",border:"none",borderRadius:8,padding:"10px",fontSize:14,fontWeight:500,cursor:"pointer"}}>
            Sign in as Rep
          </button>
        </div>

        <div style={{borderTop:"1px solid #F3F4F6",paddingTop:20}}>
          <div style={{fontSize:11,fontWeight:600,color:"#9CA3AF",marginBottom:8,textTransform:"uppercase",letterSpacing:"0.08em"}}>Manager access</div>
          <div style={{display:"flex",gap:8}}>
            <input type="password" placeholder="Manager PIN" value={managerInput}
              onChange={e=>{setManagerInput(e.target.value);setPinError("");}}
              onKeyDown={e=>{if(e.key==="Enter")handleManagerLogin();}}
              style={{flex:1,border:"1px solid #E5E7EB",borderRadius:8,padding:"8px 12px",fontSize:14}}/>
            <button onClick={handleManagerLogin}
              style={{background:"#1E40AF",color:"#fff",border:"none",borderRadius:8,padding:"8px 18px",fontSize:13,fontWeight:500,cursor:"pointer"}}>
              Enter
            </button>
          </div>
        </div>
        {pinError&&<div style={{color:"#DC2626",fontSize:12,marginTop:10,textAlign:"center"}}>{pinError}</div>}
        <div style={{fontSize:11,color:"#D1D5DB",marginTop:8,textAlign:"center"}}>Manager PIN: mgr2025</div>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"#F9FAFB"}}>
      <div style={{background:"#fff",borderBottom:"1px solid #E5E7EB",padding:"0 16px",display:"flex",alignItems:"stretch"}}>
        <div style={{fontWeight:700,fontSize:14,color:"#166534",padding:"12px 16px 12px 0",borderRight:"1px solid #E5E7EB",marginRight:12,display:"flex",alignItems:"center"}}>
          Forecast
        </div>
        {[{id:"rep",label:"Rep Entry"},{id:"manager",label:"Manager View"}].map(tab=>(
          <button key={tab.id} onClick={()=>setScreen(tab.id)}
            style={{background:"none",border:"none",borderBottom:screen===tab.id?"2px solid #166534":"2px solid transparent",
              marginBottom:"-1px",padding:"12px 14px",fontSize:13,fontWeight:screen===tab.id?600:400,
              cursor:"pointer",color:screen===tab.id?"#166534":"#6B7280"}}>
            {tab.label}
          </button>
        ))}
        <div style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:10}}>
          {loading&&<span style={{fontSize:12,color:"#9CA3AF"}}>Loading…</span>}
          {screen==="rep"&&<span style={{fontSize:13,fontWeight:500,background:"#F0FDF4",color:"#166534",padding:"3px 10px",borderRadius:20}}>{repName}</span>}
          {screen==="manager"&&<span style={{fontSize:12,background:"#EFF6FF",color:"#1E40AF",padding:"3px 10px",borderRadius:20}}>Manager</span>}
          <button onClick={()=>{setScreen("login");setRepName("");setPinInput("");setSelectedRep("");setManagerInput("");}}
            style={{background:"none",border:"1px solid #E5E7EB",borderRadius:6,padding:"5px 12px",fontSize:12,cursor:"pointer",color:"#6B7280"}}>
            Sign out
          </button>
        </div>
      </div>
      <div style={{padding:"0 16px"}}>
        {screen==="rep"&&<RepGrid repName={repName} forecasts={forecasts} setForecasts={setForecasts}
          extraProducts={extraProducts} setExtraProducts={setExtraProducts}
          extraCustomers={extraCustomers} setExtraCustomers={setExtraCustomers}
          distributors={distributors} year={year} setYear={setYear}
          activeDist={activeDist} setActiveDist={setActiveDist}/>}
        {screen==="manager"&&<ManagerView forecasts={forecasts} setForecasts={setForecasts}
          distributors={distributors} extraProducts={extraProducts} extraCustomers={extraCustomers}
          year={year} setYear={setYear} onRefresh={refresh}/>}
      </div>
    </div>
  );
}
