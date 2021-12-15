$(function () {

    /* =========================================================================================
                    PC - 언어상자
    ========================================================================================= */

    // .val() : 입력 요소에 있는 value 속성값을 불러오거나 변경시 사용

    var $input = $("input#lang"); // input상자
    var $arrow = $(".opt span.arrow"); //화살표
    var $langlist = $(".langlist"); //화살표 클릭시 나오는 전체언어 리스트
    $langlist.find("a").on("click", function () {
        $input.val($(this).text()); // 언어선택시 입력상자의 내용 변경
        $(this).parent().addClass("on").siblings().removeClass("on");
        // .parent() - a의 부모인 li선택
        $langlist.toggle();
        $arrow.toggleClass("arrow-up");
    });

    $input.add($arrow).on("click", function () { // add() : 추가
        $langlist.toggle();
        $arrow.toggleClass("arrow-up"); //
    });

    $($langlist).mouseleave(function () {
        $langlist.hide();
        $arrow.toggleClass("arrow-up");
    });

    /* =========================================================================================
                    메뉴 - PC, Mobile
    ========================================================================================= */


    // 메인메뉴 - scroll 이벤트와 scrollTop()을 이용한 원페이지 구현
    var $topmenu=$(".gnb>li>a");
    var gapH=0; // 가로 폭에 따른 탑메뉴 클릭시의 높이값 저장변수

    // 1단계 - 메인배너와 article의 top 값을 배열에 저장
    var arrContH=new Array(); // 빈 배열 선언
    
    function setPosArticle(){
        arrContH=[]; // 배열 비움
        arrContH.push($("header+hr+section").offset().top); // 메인 배너의 높이값 추가
        $("#mainsrv>article").each(function(idx){
            arrContH.push($(this).offset().top);
            // article이 시작하는 y좌표값을 동적으로 배열에 저장
            // article의 높이가 변경되어도 정확하게 시작점으로 스크롤됨
        });
    }

    // .push(새 데이터) : 배열 개체의 메서드 - 배열 객체 마지막 인덱스에 새 데이터 삽입
    // .each() : 여러개의 요소들에 순차적으로 하나씩 접근

    // 2단계 - 스크롤 높이값에 따른 메뉴의 색변화
    $(window).on("scroll",function(){
        var scrollH=$(this).scrollTop(); // 현재 스크롤 탑값
        for(var i=0; i<$topmenu.size(); i++){
            if(scrollH>=arrContH[i+1]-gapH){
                $topmenu.eq(i).parent().addClass("on").siblings().removeClass("on"); // 해당 메뉴에 on 클래스 추가
            } else if(scrollH<arrContH[1]-gapH){
                $topmenu.parent().removeClass("on");
            }
        }
    });

    // 3단계 - 메뉴 클릭에 따른 article 영역의 위치 이동 애니메이션
    $topmenu.on("click",function(evt){
        var nowIdx=$topmenu.index($(this));
        $("html,body").stop().animate({
            scrollop : arrContH[nowIdx+1]
        },400,"easeInOutCubic");

        if($(window).width()<=640){
            $btnGnb.trigger("click");
            // .trigger() : 강제로 특정 이벤트를 발생시킴
        }
        evt.preventDefault(); // 링크차단 메서드
    });

    // 4단계 - 로고 클릭시 최상단 이동
    $(".logo").on("click",function(evt){
        $("html,body").stop().animate({
            scrollTop : 0
        },400,"easeInOutCubic");
        evt.preventDefault(); // 링크차단 메서드
    });
    
    // 5단계 - 모바일 본문 내용 변경 할 요소 변수지정 및 새 요소 교체

    // .html() 메서드 - 하위요소 부르기
    // .html(새요소) 메서드 - 새 요소로 바꿈

    

    /* =========================================================================================
                    Mobile 버튼 클릭 시 서브메뉴 나타남
    ========================================================================================= */

    // 메뉴버튼
    // .toggle() : 누르면 노출되고 닫혀짐(display가 block이었다면 none으로, none이었다면 block으로)
    // .toggleClass : 지정한 클래스가 없으면 생성, 있으면 없앰

    var $btnGnb = $("header>.container>.btn-gnb");
    var $nav = $("header>.container>nav");
    $btnGnb.on("click", function () {
        $(this).toggleClass("close");

        $nav.toggle();
    });


    

});