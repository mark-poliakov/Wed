let carouselItems = Array.from(document.querySelectorAll(".carousel__item"));
let sliderItems = Array.from(document.querySelectorAll(".carousel__slider__item"));
let indexOfActive = 0;
let slideCount = carouselItems.length;
let doDelete = false,
    isMovingPerforming = false;
let slideToDelete,
    sliderItemToDelete

for (let i = 0; i < carouselItems.length; i++)
{
    if (carouselItems[i].classList.contains("active"))
    {
        indexOfActive = i;
    }
}
function deleteSlide ()
{
    carouselItems.splice(carouselItems.indexOf(slideToDelete), 1);
    document.querySelector(".carousel").removeChild(slideToDelete);
    sliderItems.splice(sliderItems.indexOf(sliderItemToDelete), 1);
    document.querySelector(".carousel__slider").removeChild(sliderItemToDelete);
    document.querySelector("#operationsResults").innerHTML = "You have deleted a slide!";
    if (indexOfActive !== 0)
        indexOfActive--;
    slideCount--;
    doDelete = false;
}
function moveCarouselRight (indexOfNewActive = (indexOfActive + 1) % carouselItems.length)
{
    if (slideCount < 2 || isMovingPerforming)
        return;
    isMovingPerforming = true;
    carouselItems[indexOfNewActive].classList.add("active", "moving__right");
    carouselItems[indexOfActive].classList.add("removing__right");
    document.querySelector(".carousel__slider__item.active").classList.remove("active");
    sliderItems[indexOfNewActive].classList.add("active");
    window.setTimeout(endMovingRight, 400, indexOfNewActive);
}
function endMovingRight (indexOfNewActive)
{
    carouselItems[indexOfActive].classList.remove("active", "removing__right");
    carouselItems[indexOfNewActive].classList.remove("moving__right");
    indexOfActive = indexOfNewActive;
    if (doDelete)
    {
        deleteSlide();
    }
    isMovingPerforming = false;
}
function moveCarouselLeft (indexOfNewActive = (carouselItems.length + indexOfActive - 1) % carouselItems.length)
{
    if (slideCount < 2 || isMovingPerforming)
        return;
    isMovingPerforming = true;
    carouselItems[indexOfNewActive].classList.add("active", "moving__left");
    carouselItems[indexOfActive].classList.add("removing__left");
    document.querySelector(".carousel__slider__item.active").classList.remove("active");
    sliderItems[indexOfNewActive].classList.add("active");
    window.setTimeout(endMovingLeft, 400, indexOfNewActive);
}
function endMovingLeft (indexOfNewActive)
{
    carouselItems[indexOfActive].classList.remove("active", "removing__left");
    carouselItems[indexOfNewActive].classList.remove("moving__left");
    indexOfActive = indexOfNewActive;
    isMovingPerforming = false;
}

document.querySelector("#buttonRight").addEventListener("click", () => {moveCarouselRight((indexOfActive + 1) % carouselItems.length);});
document.querySelector("#buttonLeft").addEventListener("click", () => {moveCarouselLeft((carouselItems.length + indexOfActive - 1) % carouselItems.length);});

/* Adding slides to the carousel by user */
let currentSlideColor = 215;
function changeSlideColor ()
{
    currentSlideColor = (currentSlideColor - 15 + 215) % 215;
}

document.querySelector("#buttonAdd").addEventListener("click", addToCarousel);
function addToCarousel()
{
    input = document.querySelector("#carouselInput");
    if (input.value == "")
    {
        document.querySelector("#operationsResults").innerHTML = "You can't add empty slide! Please write something in the input above!";
        return;
    } 
    if (slideCount >= 10)
    {
        document.querySelector("#operationsResults").innerHTML = "You have reached the maximum slide count! You can't add slides anymore!";
        return;
    }
    /* Creating new slide */
    newSlide = document.createElement("div");
    newText = document.createElement("p");
    newText.innerHTML = input.value;
    newSlide.appendChild(newText);
    newSlide.classList.add("carousel__item");
    if (slideCount == 0)
        newSlide.classList.add("active");
    newSlide.setAttribute("style", "background-color: rgb(" + currentSlideColor + ", " + currentSlideColor + ", " + currentSlideColor + ");");
    changeSlideColor();
    document.querySelector(".carousel").appendChild(newSlide);
    carouselItems.push(newSlide);
    /* Creating new slider item */
    if (slideCount > 0)
        document.querySelector(".carousel__slider__item.active").classList.remove("active");
    newSliderItem = document.createElement("div");
    newSliderItem.classList.add("carousel__slider__item", "active");
    document.querySelector(".carousel__slider").appendChild(newSliderItem);
    sliderItems.push(newSliderItem);
    newSliderItem.addEventListener("click", sliderItemClick);
    /*  */
    slideCount++;
    moveCarouselRight(carouselItems.length - 1);
    /* Resetting input */
    document.querySelector("#operationsResults").innerHTML = `New slide with text \"${input.value}\" was added to the Carousel!<br>Current slide count: ${slideCount}`;
    input.value = "";
    input.focus();
}
document.querySelector("#carouselInput").addEventListener("keydown", (e) =>
{
    if (e.key === "Enter")
    {
        addToCarousel();
    }
    focus(this);
});

/* Removing current slide by user */
document.querySelector("#buttonRemove").addEventListener("click", removeFromCarousel);
function removeFromCarousel()
{
    if (slideCount < 1)
    {
        document.querySelector("#operationsResults").innerHTML = "You have nothing to delete!";
        return;
    }
    doDelete = true;
    slideToDelete = document.querySelector(".carousel__item.active");
    sliderItemToDelete = document.querySelector(".carousel__slider__item.active");
    if (slideCount == 1)
        deleteSlide();
    else if (slideCount > 1)
        moveCarouselRight()
    else 
        doDelete = false;
}
/* Carousel Slider action */
function sliderItemClick()
{
    if (isMovingPerforming)
        return;
    let indexOfClickedItem = sliderItems.indexOf(this);
    if (indexOfClickedItem < indexOfActive)
        moveCarouselLeft(indexOfClickedItem);
    else
        moveCarouselRight(indexOfClickedItem);
}