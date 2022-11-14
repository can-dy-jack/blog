const lower_bound = arr => {
    const map = new Map();
    let save = arr.slice();
    save.sort((a, b) => a-b);
    let count = 0;
    for(const v of save) {
        if(!map.has(v)) {
            map.set(v, count++);
        }
    }
    const ans = [];
    for(const v of arr) {
        ans.push(map.get(v));
    }
    return ans;
}

