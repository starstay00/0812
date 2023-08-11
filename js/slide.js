(function($){ 
    const obj = {
        init(){ 
            this.header();
            this.section1();
            this.section2();
        },
        header(){},
        section1(){
            let cnt=0;
            let setId=0;
            const slideContainer = $('#section1 .slide-container');
            const slideWrap = $('#section1 .slide-wrap');
            const slideView = $('#section1 .slide-view');
            const slideImg = $('#section1 .slide-view .slide img');
            const pageBtn = $('#section1 .page-btn');
            const nextBtn = $('#section1 .next-btn');
            const prevBtn = $('#section1 .prev-btn');
            const n = ($('#section1 .slide').length-2)-1;

            let mouseDown = null;
            let mouseUp = null;

            let dragStart = null;
            let dragEnd = null;
            let mDown = false;
            let winWidth = $(window).innerWidth();
            let sizeX = winWidth /2;

            const imgRate = 0.9984;
            const transRate = 0.3;

            slideImg.css({width: imgRate * winWidth});

            $(window).resize(function(){
                winWidth = $(window).innerWidth();
                //sizeX = winWidth /2;
                slideImg.css({width: imgRate * winWidth});
            })

            // 터치 스와이프 이벤트
            slideContainer.on({
                mousedown(e){
                    mouseDown = e.clientX; 
                    dragStart = e.clientX - (slideWrap.offset().left + 1903);  // 좌측끝 0 시작
                    mDown = true; // 1. 드래그 시작 
                },
                mouseup(e){
                    mouseUp = e.clientX;        
                    
                    if( mouseDown-mouseUp > 0 ){
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }                            
                    }
                    
                    if( mouseDown-mouseUp < 0 ){
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }                            
                    }
                    mDown = false;
                },
                mousemove(e){
                    if(!mDown) return;                                    
                    dragEnd = e.clientX; // 4. 드래그 끝 좌표값
                    slideWrap.css({left:  dragEnd-dragStart }); // 5. 슬라이드 드래그 이동 디롭( 드래그끝 좌표값 - 드래그시작 좌표값 )
                }
            })

            slideContainer.on({
                touchstart(e){
                    winW = $(window).innerWidth(); // 마우스 다운하면 창너비 가져오기
                    mouseDown = e.originalEvent.changedTouches[0].clientX; 
                    dragStart = e.originalEvent.changedTouches[0].clientX - (slideWrap.offset().left+winW);  // 좌측끝 0 시작
                    mDown = true; // 1. 드래그 시작 
                    slideView.css({ cursor: 'grabbing' }); // 잡는다 (드래그)
                },
                touchend(e){
                    mouseUp = e.originalEvent.changedTouches[0].clientX;        
                    if( mouseDown-mouseUp > 20 ){ 
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            nextCount();
                        }                            
                    }
                    
                    if( mouseDown-mouseUp < -20 ){ 
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            prevCount();
                        }                            
                    }

                    mDown = false;  // 2. 드래그 끝을 알려주는 마우스 업상태
                    slideView.css({ cursor: 'grab' }); // 놓는다 손바닥 펼친다.
                }                
            })

            // 1. 메인슬라이드함수
            function mainSlide(){
                slideWrap.stop().animate({left: (-100*cnt) +'%'}, 600, 'easeInOutExpo', function(){
                    if(cnt>n){cnt=0}
                    if(cnt<0){cnt=n}
                    slideWrap.stop().animate({left:(-100*cnt) +'%'}, 0);
                });
                pageEvent();
            }

            // 2-1. 다음카운트함수
            function nextCount(){
                cnt++;
                mainSlide();
            }
            // 2-2. 이전카운트함수
            function prevCount(){
                cnt--;
                mainSlide();
            }

            nextBtn.on({
                click(e){
                    e.preventDefault();
                    nextCount();
                    clearInterval(setId);
                    autoTimer();
                }
            });
    
            prevBtn.on({
                click(e){
                    e.preventDefault();
                    prevCount();
                    clearInterval(setId);
                    autoTimer();
                }
            });

            function autoTimer(){
                setId = setInterval(nextCount, 3000);
            }
           // autoTimer();

            // 4. 페이지 이벤트 함수
            function pageEvent(){
                //console.log(cnt);
                pageBtn.removeClass('on');
                pageBtn.eq( cnt>n ? 0 : cnt).addClass('on');
            }

            // 5. 페이지버튼클릭
            pageBtn.each(function(idx){
                $(this).on({
                    click(e){
                        e.preventDefault();
                        cnt=idx;
                        mainSlide();
                        clearInterval(setId); //
                    }
                });
            });   
        },
        section2(){
            // 0. 변수설정
            let cnt = 0;
            let setId= 0;
            const section2Container = $('#section2 .container');
            const slideContainer = $('#section2 .slide-container');
            const slideWrap = $('#section2 .slide-wrap');
            const slideView = $('#section2 .slide-view');
            const slide = $('#section2 .slide-view .slide');
            const slideImg = $('#section2 .slide img');
            const nextBtn2 = $('#section2 .next-btn');
            const prevBtn2 = $('#section2 .prev-btn');
            const heightRate = 1.28727; // 슬라이드 넓이에 대한 높이 비율 

            let touchStart = null;
            let touchEnd = null;

            let dragStart = null;
            let dragEnd = null;
            let mDown = false;
            let winWidth = slideContainer.innerWidth();
            let sizeX = 200;
            let offsetL = slideWrap.offset().left;
            let slideWidth;
            const imgRate = 0.13084;
            const conRate = 0.5517603783;
            
            resizeFn(); 

            function resizeFn(){
                winWidth = $(window).innerWidth();
                if(winWidth <= 1642) {
                    if(winWidth > 1100) { 
                        slideWidth = (section2Container.innerWidth())/4;
                        n = slide.length - 2;
                        if(cnt>=n-1){
                            cnt=n-1;
                        }
                    }
                    else { 
                        slideWidth = (section2Container.innerWidth())/1;
                        n = slide.length;
                    }
                }
                else {
                    slideWidth = (section2Container.innerWidth())/4;
                }
                slideWrap.css({width:slideWidth * 20});
                slide.css({width:slideWidth, height:slideWidth * heightRate});
            }
            
            $(window).resize(function(){
                resizeFn();
            });

            slideContainer.on({
                mousedown(e){
                    touchStart = e.clientX;
                    dragStart = e.clientX - (slideWrap.offset().left - offsetL);
                    mDown = true;
                    slideView.css({cursor:'grabbing'});
                },
                mouseup(e){
                    touchEnd = e.clientX;
                    if(touchStart-touchEnd > sizeX){
                        nextCount2();
                    }
                    if(touchStart-touchEnd < -sizeX){
                        prevCount2();
                    }
                    mDown = false; 
                    if(touchStart-touchEnd >= -sizeX && touchStart-touchEnd <= sizeX){
                        mainSlide();
                    }
                    slideView.css({cursor:'grab'});
                },
                mousemove(e){
                    if(!mDown) return;
                    dragEnd = e.clientX;
                    slideWrap.css({left:dragEnd-dragStart});
                    if(touchStart-touchEnd >= -sizeX && touchStart-touchEnd <= sizeX){
                        mainSlide();
                    }
                }
            });    

            slideContainer.on({
                touchstart(e){
                    winW = $(window).innerWidth(); // 마우스 다운하면 창너비 가져오기
                    mouseDown = e.originalEvent.changedTouches[0].clientX; 
                    dragStart = e.originalEvent.changedTouches[0].clientX - (slideWrap.offset().left+winW);  // 좌측끝 0 시작
                    mDown = true; // 1. 드래그 시작 
                    slideView.css({ cursor: 'grabbing' }); // 잡는다 (드래그)
                },
                touchend(e){
                    mouseUp = e.originalEvent.changedTouches[0].clientX;        
                    if( mouseDown-mouseUp > 20 ){ 
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            nextCount2();
                        }                            
                    }
                    
                    if( mouseDown-mouseUp < -20 ){ 
                        clearInterval(setId); // 클릭시 일시중지
                        if(!slideWrap.is(':animated')){
                            prevCount2();
                        }                            
                    }

                    mDown = false;  // 2. 드래그 끝을 알려주는 마우스 업상태
                    slideView.css({ cursor: 'grab' }); // 놓는다 손바닥 펼친다.
                }                
            })

            // 1. 메인슬라이드함수
            mainSlide();
            function mainSlide(){         
                nextPrevBtn();       
                slideWrap.stop().animate({left: (-263*4) * cnt }, 600, 'easeInOutExpo');                
            }

            // 다음카운트함수
            function nextCount2(){
                cnt++;
                if(cnt>4) {cnt=4};
                mainSlide();
            }

            // 이전카운트함수
            function prevCount2(){
                cnt--
                if(cnt<0) {cnt=0};
                mainSlide();
            }

            nextBtn2.on({
                click(e){
                    e.preventDefault();
                    nextCount2();
                    clearInterval(setId);
                }
            });
    
            prevBtn2.on({
                click(e){
                    e.preventDefault();
                    prevCount2();
                    clearInterval(setId);
                }
            });


            function nextPrevBtn(){
                if(cnt > 3) { 
                    nextBtn2.fadeOut(300); 
                }
                else{
                    nextBtn2.fadeIn(300); 
                }

                if(cnt < 1) { 
                    prevBtn2.fadeOut(300); 
                }
                else{
                    prevBtn2.fadeIn(300);
                }
            }
        }
    }
    obj.init();
})(jQuery);
