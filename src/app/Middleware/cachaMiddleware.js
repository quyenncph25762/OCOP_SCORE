// // Ví dụ cho việc sử dụng phiên bản (version) của dữ liệu để quản lý cache
// const NodeCache = require('node-cache');
// const AccountModel = require('../models/Account');

// const myCache = new NodeCache({ stdTTL: 600 }); // TTL là 10 phút

// const cacheMiddleware = async (req, res, next) => {
//     try {
//         const cacheKey = 'myApiData';
//         let cachedData = myCache.get(cacheKey);

//         if (!cachedData) {
//             const data = await fetchDataFromDatabase();
//             myCache.set(cacheKey, { data, version: data.version }); // Lưu cả phiên bản của dữ liệu vào cache
//             req.cachedData = data;
//         } else {
//             const data = await fetchDataFromDatabase(); // Lấy phiên bản mới nhất từ database
//             if (data.version !== cachedData.version) {
//                 // Nếu phiên bản khác nhau, cập nhật cache và req.cachedData
//                 myCache.set(cacheKey, { data, version: data.version });
//                 req.cachedData = data;
//             } else {
//                 req.cachedData = cachedData.data; // Sử dụng dữ liệu từ cache
//             }
//         }

//         next();
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         next(error);
//     }
// };

// async function fetchDataFromDatabase() {
//     return new Promise((resolve, reject) => {
//         // Thực hiện truy vấn dữ liệu từ database
//         AccountModel.fetchAllUser((err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data);
//             }
//         });
//     });
// }

// module.exports = cacheMiddleware;
