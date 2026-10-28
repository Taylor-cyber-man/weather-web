// 高德地图API Key（请填入自己的 Key：https://console.amap.com/dev/key/app）
const AMAP_KEY = '';
const CACHE_EXPIRY = 10 * 60 * 1000; // 10分钟缓存过期时间
const FORECAST_CACHE_EXPIRY = 60 * 60 * 1000; // 1小时预报缓存

// 文本翻译对象（支持中英文）
const translations = {
    'zh': {
        '加载中': '加载中',
        '请选择城市': '请选择城市',
        '湿度': '湿度',
        '风速': '风速',
        '风向': '风向',
        '温度': '温度',
        '天气信息': '天气信息',
        '城市选择': '城市选择',
        '网络错误': '网络错误，请稍后重试',
        '请求超时': '请求超时，请检查网络',
        '使用缓存数据': '正在使用缓存数据',
        '晴': '晴',
        '多云': '多云',
        '阴': '阴',
        '阵雨': '阵雨',
        '小雨': '小雨',
        '中雨': '中雨',
        '大雨': '大雨',
        '暴雨': '暴雨',
        '雨夹雪': '雨夹雪',
        '小雪': '小雪',
        '中雪': '中雪',
        '大雪': '大雪',
        '暴雪': '暴雪',
        '雾': '雾',
        '霾': '霾',
        '沙尘暴': '沙尘暴',
        '当前天气': '当前天气',
        '3天预报': '3天预报'
    },
    'en': {
        '加载中': 'Loading',
        '请选择城市': 'Please select a city',
        '湿度': 'Humidity',
        '风速': 'Wind Speed',
        '风向': 'Wind Direction',
        '温度': 'Temperature',
        '天气信息': 'Weather Info',
        '城市选择': 'City Select',
        '网络错误': 'Network error, please try again',
        '请求超时': 'Request timeout, check your network',
        '使用缓存数据': 'Using cached data',
        '晴': 'Sunny',
        '多云': 'Cloudy',
        '阴': 'Overcast',
        '阵雨': 'Shower',
        '小雨': 'Light Rain',
        '中雨': 'Moderate Rain',
        '大雨': 'Heavy Rain',
        '暴雨': 'Rainstorm',
        '雨夹雪': 'Sleet',
        '小雪': 'Light Snow',
        '中雪': 'Moderate Snow',
        '大雪': 'Heavy Snow',
        '暴雪': 'Snowstorm',
        '雾': 'Fog',
        '霾': 'Haze',
        '沙尘暴': 'Sandstorm',
        '当前天气': 'Current Weather',
        '3天预报': '4-Day Forecast'
    }
};

// 活动建议的多语言
const activitySuggestions = {
    'zh': {
        sunny: [
            { condition: "comfortable", tempRange: [15, 25], emoji: "🚴‍♂️", text: "阳光明媚，适合骑行和户外探索" },
            { condition: "warm", tempRange: [25, 32], emoji: "🏊‍♂️", text: "天气温暖，游泳或水上活动是不错的选择" },
            { condition: "hot", tempRange: [32, 40], emoji: "🏠", text: "高温炎热，建议在室内或阴凉处活动" }
        ],
        cloudy: [
            { condition: "comfortable", tempRange: [15, 25], emoji: "🏃‍♀️", text: "多云微风，适合慢跑和户外运动" },
            { condition: "warm", tempRange: [25, 32], emoji: "🎾", text: "温暖多云，适合网球等球类运动" },
            { condition: "hot", tempRange: [32, 40], emoji: "🛋️", text: "高温多云，室内瑜伽或阅读更舒适" }
        ],
        rainy: [
            { condition: "all", tempRange: [-10, 40], emoji: "📚", text: "下雨天，室内阅读或喝咖啡最为惬意" }
        ],
        snowy: [
            { condition: "cold", tempRange: [-10, 0], emoji: "⛷️", text: "雪天，适合滑雪或堆雪人" },
            { condition: "freezing", tempRange: [-40, -10], emoji: "🔥", text: "严寒雪天，建议待在室内取暖" }
        ],
        special: [
            { condition: "highTemp", threshold: 32, emoji: "⚠️", text: "高温警告！减少户外活动，注意防暑降温" },
            { condition: "highHumidity", threshold: 80, emoji: "💦", text: "高湿度天气，易感闷热，注意补充水分" },
            { condition: "strongWind", threshold: 6, emoji: "🌬️", text: "大风天气，外出需注意安全" }
        ],
        night: { emoji: "🌙", text: "晚间时段，适合散步或参加夜市活动" }
    },
    'en': {
        sunny: [
            { condition: "comfortable", tempRange: [15, 25], emoji: "🚴‍♂️", text: "Sunny and pleasant, perfect for cycling and outdoor exploration" },
            { condition: "warm", tempRange: [25, 32], emoji: "🏊‍♂️", text: "Warm weather, swimming or water activities are great choices" },
            { condition: "hot", tempRange: [32, 40], emoji: "🏠", text: "Hot weather, better to stay indoors or in the shade" }
        ],
        cloudy: [
            { condition: "comfortable", tempRange: [15, 25], emoji: "🏃‍♀️", text: "Cloudy with a breeze, great for jogging and outdoor sports" },
            { condition: "warm", tempRange: [25, 32], emoji: "🎾", text: "Warm and cloudy, suitable for tennis or other ball games" },
            { condition: "hot", tempRange: [32, 40], emoji: "🛋️", text: "Hot and cloudy, indoor yoga or reading are more comfortable" }
        ],
        rainy: [
            { condition: "all", tempRange: [-10, 40], emoji: "📚", text: "Rainy day, perfect for reading indoors or enjoying coffee" }
        ],
        snowy: [
            { condition: "cold", tempRange: [-10, 0], emoji: "⛷️", text: "Snowy day, great for skiing or building a snowman" },
            { condition: "freezing", tempRange: [-40, -10], emoji: "🔥", text: "Freezing snow, better to stay indoors" }
        ],
        special: [
            { condition: "highTemp", threshold: 32, emoji: "⚠️", text: "High temperature warning! Reduce outdoor activities" },
            { condition: "highHumidity", threshold: 80, emoji: "💦", text: "High humidity, feeling muggy, stay hydrated" },
            { condition: "strongWind", threshold: 6, emoji: "🌬️", text: "Strong wind, be careful when going out" }
        ],
        night: { emoji: "🌙", text: "Evening time, great for a walk or night market" }
    }
};

// 获取当前语言
function getCurrentLang() {
    const browserLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    return browserLang === 'zh' ? 'zh' : 'en';
}

// 翻译文本
function translate(key) {
    const lang = getCurrentLang();
    return translations[lang][key] || key;
}

$(document).ready(function() {
    // 更新界面文本为当前语言
    updateTextForLang();
    
    // 加载城市列表
    loadCityData();
    
    // 设置响应式布局监听
    $(window).on('resize', adjustLayout);
    adjustLayout(); // 初始布局调整
    
    // 设置日期显示
    updateCurrentDate();
    
    // 添加标签切换事件
    $('.weather-tab').click(function() {
        const tab = $(this).data('tab');
        switchWeatherTab(tab);
    });
});

// 更新当前日期显示
function updateCurrentDate() {
    const now = new Date();
    const lang = getCurrentLang();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        weekday: 'long' 
    };
    
    const dateString = now.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', options);
    $('#current-date').text(dateString);
}

// 切换天气标签页
function switchWeatherTab(tab) {
    // 更新标签状态
    $('.weather-tab').removeClass('active');
    $(`.weather-tab[data-tab="${tab}"]`).addClass('active');
    
    // 显示对应的内容
    if (tab === 'current') {
        $('#current-weather').show();
        $('#forecast-weather').hide();
    } else if (tab === 'forecast') {
        $('#current-weather').hide();
        $('#forecast-weather').show();
        
        // 如果已经选择了城市，则尝试获取预报数据
        const selectedCity = $('.city-item.selected');
        if (selectedCity.length) {
            const cityId = selectedCity.data('id');
            const cityName = selectedCity.find('.city-name').text();
            fetchForecastData(cityId, cityName);
        }
    }
}

// 更新界面文本为当前语言
function updateTextForLang() {
    $('[data-translate]').each(function() {
        const key = $(this).data('translate');
        $(this).text(translate(key));
    });
    
    // 更新标签文本
    $('.weather-tab[data-tab="current"]').text(translate('当前天气'));
    $('.weather-tab[data-tab="forecast"]').text(translate('3天预报'));
}

// 模块1：加载城市数据并生成城市选择器
function loadCityData() {
    $('#city-error').hide();
    
    $.ajax({
        url: 'cities.json',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            renderCityList(data);
        },
        error: function() {
            const errorText = translate('网络错误') + ': 无法加载城市数据';
            $('#city-error').text(errorText).show();
        }
    });
}

// 渲染城市列表
function renderCityList(cities) {
    const $cityList = $('#city-list');
    $cityList.empty();
    
    if (!cities || cities.length === 0) {
        const errorText = translate('网络错误') + ': 无可用城市数据';
        $('#city-error').text(errorText).show();
        return;
    }
    
    cities.forEach(city => {
        const $cityItem = $(`
            <div class="city-item" data-id="${city.id}">
                <img src="img/${city.name}.png" alt="${city.name}" class="city-icon">
                <p class="city-name">${city.name}</p>
            </div>
        `);
        
        $cityItem.click(function() {
            // 取消之前的选择
            $('.city-item').removeClass('selected');
            
            // 设置当前选择
            $cityItem.addClass('selected');
            
            // 更新城市名称
            $('#city-name').text(city.name);
            
            // 获取天气数据
            fetchWeatherData(city.id, city.name);
            
            // 如果正在查看预报，切换到当前天气标签页
            switchWeatherTab('current');
        });
        
        $cityList.append($cityItem);
    });
    
    // 默认选择第一个城市
    if (cities.length > 0) {
        $cityList.find('.city-item:first').click();
    }
}
// 响应式布局处理
function adjustLayout() {
    const width = $(window).width();
    let columns = 4; // 默认每行4个
    
    if (width < 600) {
        columns = 1;
    } else if (width < 900) {
        columns = 2;
    } else if (width < 1200) {
        columns = 3;
    }
    
    // 更新城市项宽度
    $('.city-item').css('flex', `0 0 calc(${100/columns}% - 15px)`);
}

// 模块2：获取当前天气数据
function fetchWeatherData(cityId, cityName) {
    // 显示加载动画
    $('#weather-loading').show();
    $('#weather-error').hide();
    $('#city-name').text(cityName);
    
    // 请求当前天气API
    $.ajax({
        url: 'https://restapi.amap.com/v3/weather/weatherInfo',
        method: 'GET',
        data: {
            key: AMAP_KEY,
            city: cityId,
            extensions: 'base'
        },
        timeout: 8000,
        success: function(response) {
            $('#weather-loading').hide();
            if (response.status === '1' && response.lives.length > 0) {
                const weatherData = response.lives[0];
                updateWeatherCard(weatherData, false);
            } else {
                const errorText = translate('网络错误') + ': ' + (response.info || '无天气数据');
                showWeatherError(errorText);
            }
        },
        error: function(jqXHR, textStatus) {
            $('#weather-loading').hide();
            let errorText = translate('网络错误');
            if (textStatus === 'timeout') {
                errorText = translate('请求超时');
            }
            showWeatherError(errorText);
        }
    });
}

// 获取预报天气数据
function fetchForecastData(cityId, cityName) {
    // 显示加载动画
    $('#weather-loading').show();
    $('#weather-error').hide();
    
    // 请求预报天气API
    $.ajax({
        url: 'https://restapi.amap.com/v3/weather/weatherInfo',
        method: 'GET',
        data: {
            key: AMAP_KEY,
            city: cityId,
            extensions: 'all'
        },
        timeout: 8000,
        success: function(response) {
            $('#weather-loading').hide();
            if (response.status === '1' && response.forecasts && response.forecasts.length > 0) {
                updateForecastCard(response.forecasts[0], false);
            } else {
                const errorText = translate('网络错误') + ': ' + (response.info || '无预报数据');
                showWeatherError(errorText);
            }
        },
        error: function(jqXHR, textStatus) {
            $('#weather-loading').hide();
            let errorText = translate('网络错误');
            if (textStatus === 'timeout') {
                errorText = translate('请求超时');
            }
            showWeatherError(errorText);
        }
    });
}

// 更新当前天气卡片
function updateWeatherCard(data, isCached) {
    // 使用缓存提示
    if (isCached) {
        showCacheNotification();
    }
    
    // 温度显示
    $('#temperature').html(`
        <span class="temp-value">${data.temperature}°</span>
        <span class="temp-label">C</span>
    `);
    
    // 天气描述（多语言）
    const weatherDesc = data.weather;
    $('#description').text(translate(weatherDesc));
    
    // 根据天气设置表情
    const weatherEmoji = getWeatherEmoji(weatherDesc);
    $('#weather-emoji').text(weatherEmoji);
    
    // 更新其他天气信息
    $('#humidity').text(data.humidity + '%');
    $('#wind').text(data.windpower + '级');
    $('#wind-direction').text(data.winddirection);
    
    // 添加活动建议
    const activitySuggestion = generateActivitySuggestion(data);
    $('#activity-emoji').text(activitySuggestion.emoji);
    $('#activity-text').text(activitySuggestion.text);
}

// 更新预报天气卡片
function updateForecastCard(data, isCached) {
    // 使用缓存提示
    if (isCached) {
        showCacheNotification();
    }
    
    // 更新预报列表
    const $forecastList = $('#forecast-list');
    $forecastList.empty();
    
    if (data.casts && data.casts.length > 0) {
        // 获取今天的日期
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        data.casts.forEach((cast, index) => {
            // 只显示未来3天的预报（共4天，今天+未来3天）
            if (index >= 1) {
                // 获取星期几的名称
                const weekMap = { '1': '一', '2': '二', '3': '三', '4': '四', '5': '五', '6': '六', '7': '日' };
                const weekName = `${translate('周')}${weekMap[cast.week]}`;
                
                // 显示日期
                const forecastDate = new Date(cast.date.replace(/-/g, '/'));
                const dateDisplay = `${forecastDate.getMonth() + 1}/${forecastDate.getDate()}(${weekName})`;
                
                const forecastEmoji = getWeatherEmoji(cast.dayweather);
                
                $forecastList.append(`
                    <div class="forecast-item">
                        <div class="forecast-date">${dateDisplay}</div>
                        <div class="forecast-emoji">${forecastEmoji}</div>
                        <div class="forecast-weather-desc">${translate(cast.dayweather)}</div>
                        <div class="forecast-temperature">
                            <span class="temp-high">${cast.daytemp}°</span>
                            <span class="temp-low">${cast.nighttemp}°</span>
                        </div>
                        <div class="forecast-details">
                            <div>${cast.daywind}风 ${cast.daypower}级</div>
                        </div>
                    </div>
                `);
            }
        });
    }
}

// 获取天气对应的emoji
function getWeatherEmoji(weather) {
    const emojiMap = {
        '晴': '☀️',
        '多云': '⛅',
        '阴': '☁️',
        '阵雨': '🌦️',
        '雷阵雨': '⛈️',
        '小雨': '🌧️',
        '中雨': '🌧️',
        '大雨': '🌧️',
        '暴雨': '⛈️',
        '雨夹雪': '🌨️',
        '小雪': '❄️',
        '中雪': '❄️',
        '大雪': '❄️',
        '暴雪': '❄️',
        '雾': '🌫️',
        '霾': '😷',
        '沙尘暴': '🌪️'
    };
    
    return emojiMap[weather] || '🌈';
}

// 优化后的活动建议算法
function generateActivitySuggestion(data) {
    const temp = parseInt(data.temperature);
    const weatherDesc = data.weather;
    const humidity = parseInt(data.humidity);
    const windPower = parseInt(data.windpower);
    const lang = getCurrentLang();
    
    // 获取当前时间
    const now = new Date();
    const hours = now.getHours();
    const isNight = hours >= 18 || hours <= 6; // 晚上6点到早上6点视为夜晚
    
    // 确定基本天气类型
    let weatherType = "sunny";
    if (weatherDesc.includes('雨') || weatherDesc.includes('雷')) {
        weatherType = "rainy";
    } else if (weatherDesc.includes('云')) {
        weatherType = "cloudy";
    } else if (weatherDesc.includes('雪')) {
        weatherType = "snowy";
    } else if (weatherDesc.includes('雾') || weatherDesc.includes('霾') || weatherDesc.includes('沙')) {
        weatherType = "foggy";
    }
    
    // 1. 检查特殊条件（高温、高湿、大风） - 优先级最高
    if (temp >= 32) {
        return activitySuggestions[lang].special.find(s => s.condition === "highTemp") || {emoji: "⚠️", text: "高温警告！减少户外活动"};
    }
    
    if (humidity > 80) {
        return activitySuggestions[lang].special.find(s => s.condition === "highHumidity") || {emoji: "💦", text: "高湿度天气，注意补充水分"};
    }
    
    if (windPower > 6) {
        return activitySuggestions[lang].special.find(s => s.condition === "strongWind") || {emoji: "🌬️", text: "大风天气，外出注意安全"};
    }
    
    // 2. 获取天气相关建议
    const weatherSuggestions = activitySuggestions[lang][weatherType] || activitySuggestions[lang].sunny;
    
    // 3. 尝试匹配精确温度条件
    let suggestion;
    if (temp < 15) {
        suggestion = weatherSuggestions.find(s => s.condition === "comfortable") || weatherSuggestions[0];
    } else if (temp < 25) {
        suggestion = weatherSuggestions.find(s => s.condition === "warm") || weatherSuggestions[1];
    } else {
        suggestion = weatherSuggestions.find(s => s.condition === "hot") || weatherSuggestions[2];
    }
    
    // 4. 如果是夜间时间，调整建议
    if (isNight) {
        suggestion = {
            ...suggestion,
            text: `${activitySuggestions[lang].night.text}，${suggestion.text}`,
            emoji: `${activitySuggestions[lang].night.emoji} ${suggestion.emoji}`
        };
    }
    
    return suggestion || {emoji: "👋", text: "天气宜人，适合外出活动"};
}

// 显示天气错误信息
function showWeatherError(message) {
    $('#weather-error').text(message).show();
}

// 显示缓存通知
function showCacheNotification() {
    const $notification = $('<div class="cache-notification">')
        .text(translate('使用缓存数据'));
    
    $('.weather-card-container').append($notification);
    
    // 3秒后自动隐藏通知
    setTimeout(() => {
        $notification.fadeOut(500, function() {
            $(this).remove();
        });
    }, 3000);
}

