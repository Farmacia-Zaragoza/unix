#!/bin/bash
# Generacion de carpetas - Pf Image page

#RES_BASE=$1
#RES_BASE=1600x1200
RES_BASE=4608x3456

res="320x180 480x270 767x431 1024x576 1280x720 1824x1026 2100x1181"


for j in ${res}  ; do
hor=$(echo $j | cut -d "x" -f1)
ver=$(echo $j | cut -d "x" -f2)
hor2=$hor
ver2=$ver
if [ ${#hor} -eq 3 ] ; then hor2="0${hor}" ; fi
if [ ${#ver} -eq 3 ] ; then ver2="0${ver}" ; fi
if [ ${#hor} -eq 2 ] ; then hor2="00${hor}" ; fi
if [ ${#ver} -eq 2 ] ; then ver2="00${ver}" ; fi
echo "$hor - $ver"
res2="${hor2}x${ver2}"

cp -Rf ${RES_BASE} $res2
cd $res2
for i in $(find . -type f ); do echo $i ;  rename "s/${RES_BASE}/${res2}/g" $i ; done
for i in $(find . -type f ); do echo $i ;  convert -resize "x$ver" $i $i ; done
for i in $(find . -type f ); do echo $i ;  convert -resize "$hor" $i $i ; done
for i in $(find . -type f ); do echo $i ;  convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85%  $i $i ; done
cd ..
done


