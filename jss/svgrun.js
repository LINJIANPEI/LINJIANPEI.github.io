var svgContainer = document.getElementById('svgContainer');
bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: 'svg',
    loop: true,
    //  此处的 animationData  就是 引入的 data.js 中定义的变量  
    animationData: animationData
});