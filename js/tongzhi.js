// noinspection JSIgnoredPromiseFromCall

// 这个语句的作用就是取代了BF原生的悬浮窗，不想要的话可以删掉（不确保没BUG）
// 注意：如果你使用了这段代码，请务必保证它在比较靠后的位置执行，否则可能会出现代码执行的时候btf还没有被定义的问题
btf.snackbarShow = (text, time = 3500) => kms.pushInfo(text, null, time)

const kms = {

    /** 是否为移动端 */
    isMobile: 'ontouchstart' in document.documentElement,
    
    /** 缓存 */
    _cache: {
        win: new Map(),
        winCode: 0
    },
    /**
     * 在右上角弹出悬浮窗
     * @param text {string} 悬浮窗文本
     * @param button {{icon: string?, text: string, desc: string?, onclick: function?}}
     *  传入null表示没有按钮（icon: 图标，text: 按钮文本，desc: 描述文本， cb: 点击按钮时触发的回调）
     * @param time {number} 持续时间
     * @return {function(void)} 返回一个函数对象，不接受任何参数，调用可手动关闭悬浮窗
     */
    pushInfo: (text, button = null, time = 3500) => {
        const idMap = kms._cache.win
        /**
         * 移动指定悬浮窗
         * @param id {string} 悬浮窗ID
         * @param direct {boolean} 移动方向，true为上，false为下
         */
        const moveWin = (id, direct) => {
            const list = document.getElementsByClassName('float-win')
            const moveHeight = document.getElementById(id).offsetHeight + 10
            for (let i = list.length - 1; i !== -1; --i) {
                const div = list[i]
                if (div.id === id) break
                const value = parseInt(div.getAttribute('move')) + (direct ? -moveHeight : moveHeight)
                div.setAttribute('move', value)
                div.style.transform = `translateY(${value}px)`
            }
        }
        /**
         * 关闭指定悬浮窗
         * @param id {string} 悬浮窗ID
         * @param move {boolean} 是否移动其余悬浮窗
         */
        const closeWin = (id, move = true) => new Promise(() => {
            const div = document.getElementById(id)
            if (!div || div.classList.contains('delete')) return
            div.onanimationend = () => {
                idMap.delete(div.id)
                document.body.removeChild(div)
            }
            div.classList.add('delete')
            div.style.transform = ''
            if (move) moveWin(id, true)
        })
        /** 关闭多余的悬浮窗 */
        const closeRedundantWin = maxCount => new Promise(() => {
            const list = document.getElementsByClassName('float-win')
            if (list && list.length > maxCount) {
                const count = list.length - maxCount
                for (let i = 0; i !== count; ++i) {
                    closeWin(list[list.length - i - 1].id, false)
                }
            }
        })
        /** 构建html代码 */
        const buildHTML = id => {
            const cardID = `float-win-${id}`
            const actionID = `float-action-${id}`
            const exitID = `float-exit-${id}`
            const buttonDesc = (button && button.desc) ? `<div class="descr"><p ${kms.isMobile ? 'class="open"' : ''}>${button.desc}</p></div>` : ''
            // noinspection HtmlUnknownAttribute
            return `<div class="float-win ${button ? 'click' : ''
            }" id="${cardID}" move="0"><i class="fa fa-info-circle"></i><button class="exit" id="${exitID}"><i class="fa fa-times"></i></button><p class="text">${text}</p>${button ?
                '<div class="select"><button class="action" id="' + actionID + '">' + (button.icon ? '<i class="' + button.icon + '">' : '') +
                '</i><p class="text">' + button.text + `</p></button>${buttonDesc}` : ''}</div></div>`
        }
        const id = kms._cache.winCode++
        document.body.insertAdjacentHTML('afterbegin', buildHTML(id))
        const actionButton = document.getElementById(`float-action-${id}`)
        const exitButton = document.getElementById(`float-exit-${id}`)
        const cardID = `float-win-${id}`
        actionButton && actionButton.addEventListener('click', () => {
            closeWin(cardID)
            if (button.onclick) button.onclick()
        })
        exitButton.addEventListener('click', () => closeWin(cardID))
        const div = document.getElementById(cardID)
        div.onmouseover = () => div.setAttribute('over', true)
        div.onmouseleave = () => div.removeAttribute('over')
        moveWin(cardID, false)
        closeRedundantWin(3)
        const task = setInterval(() => {
            const win = document.getElementById(cardID)
            if (win) {
                if (win.hasAttribute('over')) return idMap.set(cardID, 0)
                const age = (idMap.get(cardID) || 0) + 100
                idMap.set(cardID, age)
                if (age < time) return
            }
            clearInterval(task)
            closeWin(cardID)
        }, 100)
        // noinspection CommaExpressionJS
        return () => (closeWin(cardID), undefined)
    }
}
