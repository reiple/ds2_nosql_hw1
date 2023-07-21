# NoSQL HW1

## Question #1
  *  아래 3가지 question을 수행하는데 오랜 시간이 소요될 것이다. 이들을 더욱 빠르게 처리하게 위한 index를 생성하시오. 어떻게 index를 생성하면 좋을지 타당한 근거를 들어 제시하고, 실제로 성능이 얼마나 개선이 되었는지 설명하시오.

## Question #2
  * 특정 사용자 tag가 입력된 영화를 추출하고자 한다. 사용자 tag(input_tag)가 주어졌을 때, 해당 tag가 설정된 영화의 title을 전부 출력하시오. 중복이 발생하여도 된다.

```bash
> run_q2.bat <input_tag>
```

  * run_q2.bat는 다음과 같이 작성했습니다.
    * --quiet: 실행할 때 MongoDB 관련 메시지 표시 안되도록 함
    * --eval: input_tag 입력을 받기 위해 사용
```javascript
mongo movielens --quiet --eval "var input_tag = %1;" q2.js
```
  * input_tag는 다음과 같은 방법으로 조회하였습니다.
```javascript
movielens> db.ml_tags.distinct('tag')
```

### 실행 예시
  
```
> mongo movielens --quiet --eval "var input_tag = 2036;" q2.js
2036 Origin Unknown (2018)
```

```
> mongo movielens --quiet --eval "var input_tag = \"italian western\";" q2.js
In the Name of the Father (1969)
Scalps, Venganza India (1987)
Ramon the Mexican (1966)
Carambola's Philosophy: In the Right Pocket (1975)
Sentence of God (1972)
Return of Shanghai Joe (1975)
Amigo, Stay Away (1972)
Charge! (1973)
Tepepa (1969)
Thompson 1880 (1966)
A Man Called Amen (1968)
The Stranger and the Gunfighter (1975)
His Name Was Holy Ghost (1972)
Anything for a Friend (1973)
Tex and the Lord of the Deep (1985)
Killer Caliber .32 (1967)
My Name Is Pecos (1966)
Beyond the Frontiers of Hate (1972)
Due Rrringos nel Texas (1967)
Carambola (1974)
Halleluja to Vera Cruz (1973)
California (1977)
If One is Born a Swine (1967)
```

## Question #3
  * 특정 영화의 평점평균을 계산하고자 한다. 영화 title(input_title)이 주어졌을 때, 이 영화의 평점평균을 계산하시오.

### 실행 예시

```javascript
mongo movielens --eval 'var input_title = "Interstellar (2014)";' q3.js
4.098
```

```javascript
mongo movielens --eval 'var input_title = "Memento (2000)";' q3.js
4.150
```
```javascript
mongo movielens --eval 'var input_title = "Inception (2010)";' q3.js
4.156
```

```javascript
mongo movielens --eval 'var input_title = "Avatar (2009)";' q3.js
3.622
```


## Question #4
  *  특정 고객의 평점에 대한 성향(bias)이 어떤가 알아보고자 한다. 유저 ID(input_userid)가 주어졌을 때, 아래 식을 이용하여 해당 사용자의 성향(bias)를 계산하시오.
