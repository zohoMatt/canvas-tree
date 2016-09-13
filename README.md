# Canvas Tree

## Intro
This project is a canvas experiment. You can adjust parameters to draw a perfect tree for yourself!  
<img src="http://ww4.sinaimg.cn/large/72f96cbajw1f7s7tvkkouj216i0y8wm9.jpg" width = "400" height = "368" alt="图片名称" align=center />

## [Play!](https://zohofrank.github.io/canvas-tree/)
### Basic
* Click the mouse to draw a tree using current settings on the control panel.
* The control panel can be folded and unfolded.

### Control panel
> Based on [dat.gui](https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage), a light-weight UI controller.

<img src="http://ww3.sinaimg.cn/large/72f96cbajw1f7s72en2azj20m20q0acu.jpg" width = "400" height = "468" alt="图片名称" align=center />

#### message
Just a text description. As written, all settings will be applied on the next tree.

#### Shape Settings
Set the scale parameter.

#### Leaf Settings
* **drawLeaves**  
`True` to draw leaves and `False` to disable.
* **leavesColor**  
Set the color of leaves.
* **leavesWidth**  
The leaves are rectangles. Use this to set the width of leaf rectangles.
* **leavesHeight**  
Set the height of all leaves.

#### Branch Settings
* **spread**  
Set the symmetry level.
* **branchWidth**  
Set the thickness of branches.
* **maxBranchLength**  
Set the maximum length of branches.
* **maxBranchGenerations**  
All trees are binary trees. Use this to set the height of all trees.

#### Buttons
* **random**  
Randomly generate a suite of settings.
* **clear**  
Clear the canvas.

## ChangeLog
#### v1.0.0
* First released on Github pages.
