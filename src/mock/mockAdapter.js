// Fake backend for UI-only work. Enabled with VITE_MOCK=true (see util_axios.js).
// Data lives in localStorage so edits survive the page reloads some screens do; clear key below to reset.
import { AxiosError } from "axios";

const KEY = "everfresh_mock_db";
const COLLECTIONS = ["users", "orders", "plants", "seeds", "planters", "genus", "plant-types"];
const img = (seed) => `https://picsum.photos/seed/${seed}/400/400`;
const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString();
const newId = () => Math.random().toString(16).slice(2, 14).padEnd(12, "0");

function seed() {
  const genus = ["Ficus", "Monstera", "Aloe", "Ocimum"].map((name, i) => ({
    _id: `g${i}`, name, createdAt: daysAgo(30), updatedAt: daysAgo(5),
  }));
  const types = ["Indoor", "Outdoor", "Succulent", "Herb"].map((n, i) => ({
    _id: `t${i}`, plant_type_name: n, createdAt: daysAgo(30), updatedAt: daysAgo(5),
  }));
  const greenThing = (prefix, names) =>
    names.map((name, i) => ({
      _id: `${prefix}${i}`, name, sub_name: `${name} sp.`, price: 80000 + i * 25000,
      img_url: [img(prefix + i)], genus_id: `g${i % 4}`, plant_type_id: `t${i % 4}`,
      size: "Medium", height: "30-60 cm", width: "20-40 cm", light: "Bright indirect",
      water: "Weekly", humidity: "Medium", moisture: "Moist", maintenance: "Low",
      growth_rate: "Moderate", fertilizer: "Monthly", care: "Keep away from cold drafts.",
      describe: `A healthy ${name} grown in our nursery.`, zones: "10-12", uses: "Decoration",
      tolerance: "Drought", propagation: "Cuttings", problems: "Root rot if overwatered",
      bloom_time: "Spring", plant_seasonal_interest: "Year-round", noteworthy_characteristics: "Air purifying",
      video_url: "", createdAt: daysAgo(20 - i), updatedAt: daysAgo(3),
    }));
  const plants = greenThing("p", ["Fiddle Leaf Fig", "Monstera Deliciosa", "Aloe Vera", "Sweet Basil", "Rubber Plant", "Snake Plant"]);
  const seeds = greenThing("s", ["Basil Seeds", "Tomato Seeds", "Sunflower Seeds", "Mint Seeds"]);
  const planters = ["Ceramic Pot", "Self-Watering Planter", "Hanging Basket", "Terracotta Pot"].map((name, i) => ({
    _id: `pl${i}`, name, price: 120000 + i * 40000, img_object: [{ img_url: img("pl" + i), color: "white" }],
    size: "20 cm", material: "Ceramic", category: "Indoor", style: "Modern", theme: "Minimal",
    manufacturer: "EverFresh", item_model_number: `EF-${100 + i}`, item_weight: "1.2 kg",
    finish_type: "Glossy", default_color: "White", planter_form: "Round", special_feature: "Drainage hole",
    asin: `B0${i}XYZ`, best_seller_rank: i + 1, date_first_available: daysAgo(90), describe: `${name} for any room.`,
    about: "Durable and stylish.", introduction: "Perfect for small plants.", createdAt: daysAgo(15 - i), updatedAt: daysAgo(2),
  }));
  const users = ["Nguyen Van A", "Tran Thi B", "Le Van C", "Pham Thi D", "Hoang Van E"].map((name, i) => ({
    _id: `u${i}`, name, email: `user${i}@example.com`, rank: i % 2 ? "Premium" : "Normal", status: i !== 4,
    avatar_url: `https://i.pravatar.cc/150?u=${i}`, address: "123 Le Loi, District 1, HCMC",
    contactNumber: `09000000${i}`, country: "Vietnam", gender: i % 2 ? "Female" : "Male", createdAt: daysAgo(60 - i * 7),
  }));
  const statuses = ["Confirmed", "Shipped", "Delivered", "Delivered", "Failed Delivery", "Confirmed"];
  const orders = statuses.map((status, i) => {
    const items = [plants[i % plants.length], planters[i % planters.length]].map((product, j) => ({
      id: `ci${i}${j}`,
      item_id: {
        _id: product._id, product: { name: product.name, price: product.price, img_url: product.img_url || [product.img_object[0].img_url] },
        product_type: product.img_object ? "Planter" : "Plant", quantity: j + 1, item_total_price: product.price * (j + 1), updatedAt: daysAgo(i),
      },
    }));
    const steps = { Confirmed: 1, Shipped: 2, "Failed Delivery": 3, Delivered: 4 }[status];
    return {
      _id: `o${i}`, order_code: `EF${1000 + i}`, customer_id: users[i % users.length]._id, status, payment_method: i % 2 ? "COD" : "VNPay",
      delivery_method: { delivery_method_name: "Standard", price: 30000 },
      delivery_information: { address: "123 Le Loi, District 1, HCMC", address_detail: "Apt 4B", phone_number: "0900000000" },
      list_cart_item_id: items, total_price: items.reduce((s, c) => s + c.item_id.item_total_price, 30000), voucher_id: null,
      tracking_status_dates: Array.from({ length: steps }, (_, k) => ({ key: k, value: daysAgo(10 - i - k) })),
      delivered_date: status === "Delivered" ? daysAgo(1) : null, createdAt: daysAgo(10 - i), created: daysAgo(10 - i), updated: daysAgo(1),
    };
  });
  return { users, orders, plants, seeds, planters, genus, "plant-types": types };
}

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}
const db = load() || seed();
const save = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(db));
  } catch { /* quota/private mode: keep in memory only */ }
};

// Backend returned genus/plant type populated; we store ids, so populate on read.
const populate = (col, item) =>
  col === "plants" || col === "seeds"
    ? {
        ...item,
        genus_id: db.genus.find((g) => g._id === (item.genus_id?._id ?? item.genus_id)) ?? item.genus_id,
        plant_type_id: db["plant-types"].find((t) => t._id === (item.plant_type_id?._id ?? item.plant_type_id)) ?? item.plant_type_id,
      }
    : item;

const ORDER_FLOW = ["Confirmed", "Shipped", "Out of Delivery", "Delivered"];

function route(method, parts, query, body) {
  const [col, id, extra] = parts;
  const find = (c, i) => db[c]?.find((x) => x._id === i);

  if (col === "auth" && id === "login") {
    return body.email && body.password ? [200, { accessToken: "mock-token" }] : [400, {}];
  }
  if (col === "orders" && id === "admin") return [200, db.orders];
  if (col === "orders" && (id === "changeStatus" || id === "changeStatusToFailedDelivery")) {
    const o = find("orders", extra);
    if (!o) return [404, {}];
    o.status = id === "changeStatus" ? ORDER_FLOW[Math.min(ORDER_FLOW.indexOf(o.status) + 1, 3)] : "Failed Delivery";
    o.tracking_status_dates.push({ key: o.tracking_status_dates.length, value: new Date().toISOString() });
    if (o.status === "Delivered") o.delivered_date = new Date().toISOString();
    return [200, o];
  }
  if (col === "users" && (id === "banAccountByAdmin" || id === "unBanAccountByAdmin")) {
    const u = find("users", extra);
    if (!u) return [404, {}];
    u.status = id === "unBanAccountByAdmin";
    return [200, u];
  }
  if (col === "users" && id === "update" && method === "post") {
    const u = db.users.find((x) => x._id === body.id || x._id === body._id || x.email === body.email);
    if (u) Object.assign(u, body, { image: undefined });
    return [200, u ?? {}];
  }
  if (!COLLECTIONS.includes(col)) return [200, { message: "ok (mock)" }]; // unmocked endpoint: pretend success

  const list = db[col];
  if (id === "search") {
    const q = (query.get("searchName") || "").toLowerCase();
    return [200, list.filter((x) => x.name?.toLowerCase().includes(q)).map((x) => populate(col, x))];
  }
  if (!id) {
    if (method === "get") return [200, list.map((x) => populate(col, x))];
    if (method === "post") {
      const now = new Date().toISOString();
      const item = { _id: newId(), createdAt: now, updatedAt: now, ...body };
      list.push(item);
      return [201, populate(col, item)];
    }
  }
  const idx = list.findIndex((x) => x._id === id);
  if (idx === -1) return [404, { message: "Not found" }];
  if (method === "get") return [200, populate(col, list[idx])];
  if (method === "put" || method === "patch") {
    Object.assign(list[idx], body, { updatedAt: new Date().toISOString() });
    return [200, populate(col, list[idx])];
  }
  if (method === "delete") return [200, list.splice(idx, 1)[0]];
  return [405, {}];
}

export default async function mockAdapter(config) {
  const [path, qs] = config.url.split("?");
  const data = config.data;
  const body =
    data instanceof FormData ? Object.fromEntries(data) : typeof data === "string" ? JSON.parse(data || "{}") : data || {};
  const [status, resData] = route(config.method, path.split("/").filter(Boolean), new URLSearchParams(qs), body);
  save();
  await new Promise((r) => setTimeout(r, 200)); // feel like a network
  const response = { data: structuredClone(resData), status, statusText: String(status), headers: {}, config };
  if (status >= 400) throw new AxiosError(`Mock ${status}`, String(status), config, null, response);
  return response;
}
