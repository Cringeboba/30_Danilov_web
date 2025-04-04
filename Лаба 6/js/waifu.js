class WaifuLoader {
    constructor() {
        this.loadBtn = document.getElementById('load-btn');
        this.waifuImage = document.getElementById('waifu-image');
        this.waifuInfo = document.getElementById('waifu-info');
        this.loader = document.getElementById('loader');
        this.tagsInput = document.getElementById('tags');
        this.nsfwCheckbox = document.getElementById('nsfw');

        this.init();
    }

    init() {
        this.loadBtn.addEventListener('click', () => this.fetchWaifu());
    }

    async fetchWaifu() {
        this.showLoader();
        this.clearWaifuDisplay();

        const tags = this.tagsInput.value.trim();
        const isNsfw = this.nsfwCheckbox.checked;
        const url = this.buildApiUrl(tags, isNsfw);

        try {
            const data = await this.makeApiRequest(url);
            this.displayWaifu(data);
        } catch (error) {
            this.displayError(error);
        } finally {
            this.hideLoader();
        }
    }

    showLoader() {
        this.loader.classList.remove('hidden');
    }

    hideLoader() {
        this.loader.classList.add('hidden');
    }

    clearWaifuDisplay() {
        this.waifuImage.innerHTML = '';
        this.waifuInfo.innerHTML = '';
    }

    buildApiUrl(tags, isNsfw) {
        let url = 'https://api.waifu.im/search';
        const params = new URLSearchParams();
        
        if (tags) {
            params.append('included_tags', tags);
        }
        
        //НИ В КОЕМ СЛУЧАЕ НЕ УБИРАТЬ СЛЭШИ!!!!!
        //params.append('is_nsfw', isNsfw ? 'true' : 'false');
        
        return `${url}?${params.toString()}`;
    }

    async makeApiRequest(url) {
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        
        return await response.json();
    }

    displayWaifu(data) {
        if (!data.images || data.images.length === 0) {
            this.waifuImage.innerHTML = '<p>Не найдено изображений по заданным тегам</p>';
            return;
        }
        
        const waifu = data.images[0];
        this.displayImage(waifu);
        this.displayInfo(waifu);
    }

    displayImage(waifu) {
        const img = document.createElement('img');
        img.src = waifu.url;
        img.alt = 'Waifu image';
        img.loading = 'lazy';
        this.waifuImage.appendChild(img);
    }

    displayInfo(waifu) {
        let infoHTML = `
            <p><strong>ID:</strong> ${waifu.image_id}</p>
            <p><strong>Теги:</strong> ${waifu.tags.map(tag => tag.name).join(', ')}</p>
            <p><strong>Размер:</strong> ${waifu.width}×${waifu.height}</p>
            <p><strong>Формат:</strong> ${waifu.format}</p>
            <p><strong>NSFW:</strong> ${waifu.is_nsfw ? 'Да' : 'Нет'}</p>
        `;
        
        if (waifu.source) {
            infoHTML += `<p><strong>Источник:</strong> <a href="${waifu.source}" target="_blank">${waifu.source}</a></p>`;
        }
        
        this.waifuInfo.innerHTML = infoHTML;
    }

    displayError(error) {
        console.error('Ошибка при загрузке данных:', error);
        this.waifuImage.innerHTML = `<p class="error">Ошибка при загрузке изображения: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WaifuLoader();
});